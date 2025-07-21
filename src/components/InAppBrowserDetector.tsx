"use client";

import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import InAppSpy from "inapp-spy";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";

const InAppBrowserDetector = () => {
  const [isInApp, setIsInApp] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const t = useTranslations("Home.InAppBrowser");

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const detectInApp = async () => {
      try {
        const { isInApp: detected, appKey, ua } = InAppSpy();

        setIsInApp(detected);
        alert(ua);

        if (detected) {
          // Show prompt after a short delay to avoid jarring experience
          setTimeout(() => setShowPrompt(true), 1000);
          alert(appKey);

          // Auto-redirect attempt for Android
          const url = window.location.href;
          const intentLink = `intent:${url}#Intent;end`;

          // Try automatic redirect first
          try {
            window.location.replace(intentLink);
          } catch (error) {
            console.log(
              `Auto-redirect failed, showing manual prompt: ${error}`
            );
          }
        }
      } catch (error) {
        console.error("Failed to detect in-app browser:", error);
      }
    };

    detectInApp();
  }, []);

  if (!showPrompt) {
    console.log(isInApp);
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Modal onClose={() => setShowPrompt(false)}>
        <Icon name="info" className="text-red" size={24} />
        <header className="type-headline-small text-center text-balance">
          {t("title")}
        </header>
        <h2 className="type-body-medium text-left">
          {t.rich("desc", {
            dots: () => (
              <span className="inline-block align-middle">
                <Icon name="more_vert" />
              </span>
            ),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </h2>
        <Image
          src="/modals/In-app-Browser.png"
          width={168}
          height={307}
          alt={t("alt")}
        />
      </Modal>
    </div>
  );
};

export default InAppBrowserDetector;
