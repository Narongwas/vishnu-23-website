"use client";

import AlreadyStampDialog from "@/app/[locale]/admin/bingo/scanner/components/AlreadyStampDialog";
import CodeStampButton from "@/app/[locale]/admin/bingo/scanner/components/CodeStampButton";
import CodeStampModal from "@/app/[locale]/admin/bingo/scanner/components/CodeStampModal";
import PageHeader from "@/app/[locale]/admin/bingo/scanner/components/PageHeader";
import ScannerSection from "@/app/[locale]/admin/bingo/scanner/components/ScannerSection";
import StampConfirmationModal from "@/app/[locale]/admin/bingo/scanner/components/StampConfirmationModal";
import { getIdToken } from "@/lib/firebase/auth";
import { useState } from "react";

type SuccessData = {
  firstName: string;
  lastName: string;
  uid: string;
  code: string;
};

const ScannerPageClient = () => {
  const [selectedClubId, setSelectedClubId] = useState<number | null>(null);

  const [successData, setSuccessData] = useState<SuccessData | null>(null);

  const [loading, setLoading] = useState(false);

  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isAlreadyStampedOpen, setIsAlreadyStampedOpen] = useState(false);

  const handleCloseAll = () => {
    setIsCodeModalOpen(false);
    setIsAlreadyStampedOpen(false);
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
    console.log("Decoded code from QR:", code);
    await handleDecodeCodeCommon(code);
  };

  const handleDecodeCodeFromInput = async (code: string) => {
    await handleDecodeCodeCommon(code);
  };

  const handleDecodeCodeCommon = async (code: string) => {
    if (!code || !selectedClubId) {
      alert("กรุณาเลือกชมรมก่อนทำการสแกนหรือกรอกรหัส");
      return;
    }
    console.log("Decoding code:", code);
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
    if (!successData || !selectedClubId) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/bingo/admin?friendCode=${successData.code}&clubNumber=${selectedClubId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            StaffAuthorization: `Bearer ${await getIdToken()}`,
          },
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("สแตมป์สำเร็จ!");
        handleCloseAll();
      } else if (res.status === 409) {
        setIsAlreadyStampedOpen(true);
        setSuccessData(null);
      } else {
        console.error(data);
        throw new Error("Failed to stamp.");
      }
    } catch (e) {
      console.error(e);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader onClubSelect={setSelectedClubId} />

      <ScannerSection onCapture={handleDecodeCodeFromQR} />

      <div className="fixed bottom-8 left-1/2 z-20 flex w-auto -translate-x-1/2 items-center justify-center">
        <CodeStampButton onClick={() => setIsCodeModalOpen(true)} />
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

      <AlreadyStampDialog
        isOpen={isAlreadyStampedOpen}
        onClose={handleCloseAll}
      />
    </div>
  );
};

export default ScannerPageClient;
