"use client";

import AddFriendWithCodeButton from "@/app/[locale]/profile/addfriend/components/AddFriendWithCodeButton";
import CodeStampModal from "@/app/[locale]/profile/addfriend/components/AddFriendWithCodeModal";
import BackButton from "@/components/BackButton";
import HelpButton from "@/app/[locale]/profile/addfriend/components/HelpButton";
import HelpCard from "@/app/[locale]/profile/addfriend/components/HelpCard";
import MyQRPageAction from "@/app/[locale]/profile/addfriend/components/MyQRPageAction";
import ScanCard from "@/app/[locale]/profile/addfriend/components/ScanCard";
import ScannerSection from "@/app/[locale]/profile/addfriend/components/ScannerSection";
import StampConfirmationModal from "@/app/[locale]/profile/addfriend/components/StampConfirmationModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SuccessData = {
  firstName: string;
  lastName: string;
  uid: string;
  code: string;
};

const ScannerPageClient = () => {
  const router = useRouter();
  const [successData, setSuccessData] = useState<SuccessData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isScanCardOpen, setIsScanCardOpen] = useState(false);

  const handleCloseAll = () => {
    setIsCodeModalOpen(false);
    setSuccessData(null);
    setLoading(false);
  };

  const handleDecodeCodeFromQR = async (barcode: string) => {
    let code = barcode;
    try {
      if (barcode.startsWith("http")) {
        const parsedUrl = new URL(barcode);
        code =
          parsedUrl.searchParams.get("code") ||
          parsedUrl.searchParams.get("id") ||
          barcode;
      }
    } catch {}
    await handleDecodeCodeCommon(code);
  };

  const handleDecodeCodeFromInput = async (code: string) => {
    if (!code) {
      alert("กรุณากรอกรหัส");
      return;
    }
    setLoading(true);
    setIsCodeModalOpen(false);

    try {
      const res = await fetch(
        `/api/v1/friends/qr/decodeFriendCode?code=${encodeURIComponent(code)}`
      );
      if (!res.ok) throw new Error("Failed to decode code.");
      const data = await res.json();
      setSuccessData({
        firstName: data.firstName,
        lastName: data.lastName,
        uid: data.uid,
        code: code,
      });
    } catch (e) {
      console.error(e);
      handleCloseAll();
      alert("ไม่สามารถถอดรหัสได้ หรือรหัสไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  const handleDecodeCodeCommon = async (code: string) => {
    if (!code) {
      alert("กรุณาสแกนหรือกรอกรหัส");
      return;
    }
    setLoading(true);
    setIsCodeModalOpen(false);

    try {
      const res = await fetch(
        `/api/v1/friends/qr/decodeFriendCode?code=${encodeURIComponent(code)}`
      );

      if (!res.ok) {
        throw new Error("Failed to decode code.");
      }

      const data = await res.json();
      setSuccessData({
        firstName: data.firstName,
        lastName: data.lastName,
        uid: data.uid,
        code: code,
      });
    } catch (e) {
      console.error(e);
      handleCloseAll();
      alert("ไม่สามารถถอดรหัสได้ หรือรหัสไม่ถูกต้อง");
    } finally {
      setLoading(false);
    }
  };

  const handleStamp = async () => {
    if (!successData) return;

    setLoading(true);
    try {
      const res = await fetch("/api/v1/friends", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ friendId: successData.uid }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("เพิ่มเพื่อนสำเร็จ!");
        handleCloseAll();
      } else {
        console.error(data);
        throw new Error(data.error);
      }
    } catch (e) {
      console.error(e);
      alert(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ScannerSection onCapture={handleDecodeCodeFromQR} />

      <div className="relative z-10">
        <div className="fixed top-0 left-0 z-20 flex w-full items-center justify-between p-4">
          <BackButton variant="secondary" href="/profile" />
          <div className="flex gap-x-3">
            <AddFriendWithCodeButton onClick={() => setIsCodeModalOpen(true)} />
            <HelpButton
              onClick={() => setIsHelpOpen(true)}
              className="text-red"
            />
          </div>
        </div>
        <MyQRPageAction onClick={() => router.push("/profile/addfriend/qr")} />
      </div>

      <CodeStampModal
        isOpen={isCodeModalOpen}
        onClose={handleCloseAll}
        onConfirm={handleDecodeCodeFromInput}
      />

      <StampConfirmationModal
        isOpen={!!successData}
        onClose={handleCloseAll}
        onStamp={handleStamp}
        userData={successData}
        isLoading={loading}
      />

      {/* HelpCard Modal */}
      <HelpCard isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* ScanCard Modal */}
      <ScanCard
        isOpen={isScanCardOpen}
        onClose={() => setIsScanCardOpen(false)}
      />
    </div>
  );
};

export default ScannerPageClient;
