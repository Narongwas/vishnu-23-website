"use client";

import { useState } from "react";
import { getIdToken } from "@/lib/firebase/auth";
type SuccessData = {
  firstName: string;
  lastName: string;
  uid: string;
  code: string;
};

import PageHeader from "@/app/[locale]/admin/bingo/scanner/components/PageHeader";
import ScannerSection from "@/app/[locale]/admin/bingo/scanner/components/ScannerSection";
import CodeStampButton from "@/app/[locale]/admin/bingo/scanner/components/CodeStampButton";
import CodeStampModal from "@/app/[locale]/admin/bingo/scanner/components/CodeStampModal";
import StampConfirmationModal from "@/app/[locale]/admin/bingo/scanner/components/StampConfirmationModal";
import AlreadyStampDialog from "@/app/[locale]/admin/bingo/scanner/components/AlreadyStampDialog";

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

  const handleDecodeCode = async (code: string) => {
    if (!code || !selectedClubId) {
      alert("กรุณาเลือกชมรมก่อนทำการสแกนหรือกรอกรหัส");
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

      <ScannerSection onCapture={handleDecodeCode} />

      <div className="mt-8 flex items-center justify-center">
        <CodeStampButton onClick={() => setIsCodeModalOpen(true)} />
      </div>

      {/* --- Modals and Dialogs --- */}
      <CodeStampModal
        isOpen={isCodeModalOpen}
        onClose={handleCloseAll}
        onConfirm={handleDecodeCode}
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
