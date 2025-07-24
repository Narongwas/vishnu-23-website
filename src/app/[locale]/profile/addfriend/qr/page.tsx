"use client";

import cn from "@/lib/helpers/cn";
import getMe from "@/lib/helpers/getMe";
import getQrCode from "@/lib/helpers/getQrCode";
import defaultProfile from "@/public/decorating/profile/defaultProfile.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import BackButton from "@/components/BackButton";

export default function MyQRPage() {
  const t = useTranslations("Profile.QRHelpDialog");
  const [qr, setQr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState<string>("");
  const [friendCode, setFriendCode] = useState<string>("");
  const [userProfile, setUserProfile] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([getQrCode(), getMe()])
      .then(([qrData, user]) => {
        setQr(qrData.qrcode);
        setFriendCode(qrData.code);
        const name = user?.nickName?.trim()
          ? user.nickName
          : user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : "";
        setFullName(name);
        setUserProfile(user?.profileUrl || null);
      })
      .catch(() => {
        setQr(null);
        setFullName("สแกน QR Card");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSaveClick = async () => {
    if (!qr) {
      alert("ไม่พบ QR Code");
      return;
    }

    console.log("Saving QR Code:", qr);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/friends/qr/saveQR`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ base64: qr }),
        }
      );

      if (!res.ok) {
        alert("ดาวน์โหลด QR ไม่สำเร็จ");
        return;
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "qr-code.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("เกิดข้อผิดพลาดในการดาวน์โหลด QR");
    }
  };

  return (
    <div className={cn("flex min-h-screen items-center justify-center")}>
      <div className="absolute top-0 left-0 z-20 p-4">
        <BackButton variant="secondary" href="/profile/addfriend" />
      </div>
      <div className="z-10 flex flex-col items-center justify-center gap-6 p-8 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="h-18 w-18 overflow-hidden rounded-full">
            <Image
              src={userProfile || defaultProfile}
              alt="Default Profile"
              width={72}
              height={72}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="type-title-large">{fullName}</div>
        </div>
        <div className="mt-2 flex items-center justify-center">
          {loading ? (
            <div className="type-body-medium text-gray">กำลังโหลด QR...</div>
          ) : qr ? (
            <div className="flex flex-col items-center bg-white">
              <Image src={qr} alt="QR Code" width={256} height={256} />
              <div className="type-title-large pb-2 text-black">
                {friendCode}
              </div>
            </div>
          ) : (
            <div className="type-body-medium text-white">
              ไม่สามารถโหลด QR ได้
            </div>
          )}
        </div>
        <Button Size="small" Appearance="primary" onClick={handleSaveClick}>
          <Icon name="download" />
          <div className="type-title-medium">{t("action.save")}</div>
        </Button>
      </div>
    </div>
  );
}
