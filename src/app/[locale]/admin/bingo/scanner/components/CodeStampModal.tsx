"use client";

import Icon from "@/components/Icon";
import { useState } from "react";
import Button from "@/components/Button";
import Oval from "@/components/Oval";
import Image from "next/image";
import { getIdToken } from "@/lib/firebase/auth";

type PassStampModalProps = {
  ClubId: number;
  isOpen: boolean;
  onClose: () => void;
};

const CodeStampModal = ({ ClubId, isOpen, onClose }: PassStampModalProps) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState<{
    firstName: string;
    lastName: string;
    uid: string;
  } | null>(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!code) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/friends/qr/decodeFriendCode?code=${encodeURIComponent(code)}`
      );
      const data = await res.json();
      if (res.ok) {
        setSuccessData({
          firstName: data.firstName,
          lastName: data.lastName,
          uid: data.uid,
        });
      } else {
        handleClose();
      }
    } catch (e) {
      console.error(e);
      handleClose();
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCode("");
    setLoading(false);
    setSuccessData(null);
    onClose();
  };

  const handleStamp = async () => {
    if (!successData) return;
    setLoading(true);
    try {
      const res = await fetch(
        `/api/v1/bingo/admin?friendCode=${code}&clubNumber=${ClubId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            StaffAuthorization: `Bearer ${await getIdToken()}`,
          },
        }
      );
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        handleClose();
      } else {
        console.error(data);
      }
    } catch {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
        aria-label="close modal"
      />
      {/* Modal Content */}
      {successData ? (
        <Oval className="fixed -bottom-60 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-start gap-4 p-10">
          <Image
            src={"/decorating/profile/ProfileImage.svg"}
            alt="profile"
            width={108}
            height={108}
            className="h-27 w-27 rounded-full object-cover"
          />
          <p className="type-headline-small text-blue text-center">
            {successData.firstName} {successData.lastName}
          </p>
          <Button
            Size="Medium"
            Appearance="Primary"
            className="mb-4"
            onClick={handleStamp}
            disabled={loading}
          >
            <p className="type-title-medium">
              {loading ? "กำลังสแตมป์..." : "สแตมป์เลย"}
            </p>
          </Button>
        </Oval>
      ) : (
        <div className="bg-yellow-white relative z-50 w-77 overflow-hidden">
          <div className="flex flex-col items-center justify-center gap-4 px-6 pt-6 pb-9">
            <Icon name="pin" className="text-red" />
            <p className="type-headline-small">สแตมป์ด้วยรหัส</p>
            <div className="type-body-medium">
              <span>ให้น้องไปที่หน้า </span>
              <span className="font-bold">เกม</span>
              <span className="text-red mx-1">&gt;</span>
              <span className="font-bold">บิงโก</span>
              <span className="text-red mx-1">&gt;</span>
              <span className="font-bold">QR code ของน้อง</span>
              <span> แล้วลอกรหัสนิสิตของน้อง</span>
            </div>
            <input
              type="text"
              placeholder="รหัส"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="type-body-large w-full bg-white px-5 py-4"
            />
          </div>
          <div className="flex">
            <Button
              Size="Medium"
              Appearance="Secondary"
              className="w-full"
              onClick={handleClose}
              disabled={loading}
            >
              <p className="type-title-medium">ยกเลิก</p>
            </Button>

            <Button
              Size="Medium"
              Appearance="Primary"
              className="w-full"
              onClick={handleConfirm}
              disabled={loading || !code}
            >
              <p className="type-title-medium">
                {loading ? "กำลังตรวจสอบ..." : "ยืนยัน"}
              </p>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeStampModal;
