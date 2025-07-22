"use client";

import { useState } from "react";
import { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";
import Button from "@/components/Button"; // สมมติว่า Button component อยู่ที่นี่

interface SocialButtonProps {
  platform: string;
  initialValue?: string;
  onChange: (value: string) => void;
  className?: string;
}

const SocialButton: StyleableFC<SocialButtonProps> = ({
  platform,
  initialValue,
  onChange,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || "");

  const handleSubmit = () => {
    setIsEditing(false);
    onChange(value);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setValue(initialValue || "");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSubmit();
    if (e.key === "Escape") handleCancel();
  };

  // --- เตรียมค่าสำหรับ Render เพื่อลดความซ้ำซ้อน ---
  const platformIconSrc = `/social-icon/${platform}.svg`;

  // ใช้ isEditing เป็นตัวแบ่งการแสดงผลหลัก
  return isEditing ? (
    // ------------------ โหมดแก้ไข (Editing State) ------------------
    <div
      className={`border-red flex items-center gap-2 rounded border-2 bg-white px-4 py-2 ${className}`}
    >
      <Image
        src={platformIconSrc}
        alt={`${platform} icon`}
        width={24}
        height={24}
      />
      <input
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={handleSubmit} // เมื่อหลุด focus ให้ submit
        onKeyDown={handleKeyPress}
        placeholder={`${platform} ID`}
        className="w-full bg-transparent outline-none"
        autoFocus // ให้ focus ที่ input อัตโนมัติเมื่อเข้าโหมดแก้ไข
      />
    </div>
  ) : (
    <Button
      Size="small"
      // ใช้เงื่อนไขเพื่อเลือก Appearance: ถ้ามีค่าแล้วเป็น secondary, ถ้ายังไม่มีเป็น primary
      Appearance={value ? "secondary" : "primary"}
      onClick={() => setIsEditing(true)}
      className={className}
    >
      <Image
        src={platformIconSrc}
        alt={`${platform} icon`}
        width={24}
        height={24}
      />
      <span>{value || platform}</span>
    </Button>
  );
};

export default SocialButton;
