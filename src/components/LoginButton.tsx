"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { Link } from "@/i18n/navigation";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useAuth } from "@/lib/hooks/useAuth";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

type ButtonProps = {
  variant: "primary" | "secondary" | "tertiary" | "secondary-variant";
};

interface GoogleLoginBtnProps extends Pick<ButtonProps, "variant"> {
  onSuccess?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

function SearchParamsHandler({
  onRedirectChange,
}: {
  onRedirectChange: (redirect: string) => void;
}) {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  useEffect(() => {
    onRedirectChange(redirectTo);
  }, [redirectTo, onRedirectChange]);

  return null;
}

export default function GoogleLoginBtn({
  onSuccess,
  onError,
  variant = "primary",
}: GoogleLoginBtnProps) {
  const { loginWithToken, token, user } = useAuth();
  const isLoggedIn = !!token;
  const [redirectTo, setRedirectTo] = useState("/");
  const loginAttempted = useRef(false);

  const handleGoogleLogin = useCallback(async () => {
    try {
      const { user, error } = await signInWithGoogle();

      if (error) {
        const errorMessage =
          error instanceof Error ? error.message : JSON.stringify(error);
        onError?.(errorMessage || "Login failed");
      }
      if (user) {
        await loginWithToken(user);
        onSuccess?.();
        // Let RedirectHandler handle the redirect after login
      }
    } catch (error) {
      console.error("Login error:", error);
      onError?.((error as unknown as string) || "Login failed");
    }
  }, [loginWithToken, onError, onSuccess]);

  useEffect(() => {
    if (!isLoggedIn && redirectTo !== "/" && !loginAttempted.current) {
      loginAttempted.current = true;
      handleGoogleLogin();
    }
  }, [redirectTo, isLoggedIn, handleGoogleLogin]);

  const t = useTranslations("Home.Hero");

  return (
    <>
      <Suspense fallback={null}>
        <SearchParamsHandler onRedirectChange={setRedirectTo} />
      </Suspense>
      {isLoggedIn ? (
        <Link
          href="/profile"
          aria-label="Go to profile"
          title="Go to profile"
          className="inline-block"
        >
          <Image
            src="/decorating/profile/defaultProfile.png"
            alt={
              user?.displayName
                ? `${user.displayName}'s profile picture`
                : "User's profile picture"
            }
            width={44}
            height={44}
            className="rounded-full"
          />
        </Link>
      ) : (
        <Button
          onClick={handleGoogleLogin}
          Size="small"
          Appearance={variant}
          aria-label={t("action.logIn")}
          title={t("action.logIn")}
        >
          <Icon name="login" />
          <span className="type-title-medium">{t("action.logIn")}</span>
        </Button>
      )}
    </>
  );
}
