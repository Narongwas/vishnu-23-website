"use client";

import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import Icon from "@/components/Icon";
import GoogleLoginBtn from "@/components/LoginButton";
import { StyleableFC } from "@/lib/types/misc";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

const ButtonGroup: StyleableFC = ({}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const t = useTranslations("Registration");

  const handleConfirm = () => {
    if (inputValue.length === 10) {
      router.push(`/registration/result?id=${inputValue}`);
    } else {
      setIsDialogOpen(false);
      alert("กรุณากรอกเลขนิสิตให้ถูกต้อง");
    }
  };
  return (
    <div className="flex gap-2">
      <GoogleLoginBtn variants="tertiary" />
      <Button
        Size="small"
        Appearance="tertiary"
        onClick={() => setIsDialogOpen(!isDialogOpen)}
      >
        <Icon name="search" />
        <p className="type-title-medium">{t("Landing.action.search")}</p>
      </Button>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Dialog
            onClose={() => setIsDialogOpen(false)}
            onConfirm={handleConfirm}
          >
            <div className="flex flex-col items-center gap-4">
              <Icon name="search" size={24} className="text-red" />
              <p className="type-headline-small">ค้นหาด้วยเลขนิสิต</p>
              <p className="type-body-medium">
                กรอกเลขประจำตัวนิสิต 10 หลัก เพื่อดู จุดลงทะเบียนสำหรับค่ายวิษณุ
                Day 1
              </p>
              <input
                type="text"
                placeholder="68XXXXXX21"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="type-body-large w-full bg-white px-5 py-4 text-black placeholder-black/40 outline-none"
              />
            </div>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default ButtonGroup;
