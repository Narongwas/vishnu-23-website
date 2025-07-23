"use client";

import { useRef } from "react";
import { StyleableFC } from "@/lib/types/misc";
import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { getIdToken } from "@/lib/firebase/auth";

const EditUserProfileButton: StyleableFC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    console.log("Uploading file:", file.name);
    const token = await getIdToken();
    console.log("Token:", token);
    const res = await fetch("/api/v1/users/profile/picture", {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      body: formData,
    });

    if (res.ok) {
      alert("อัปโหลดรูปสำเร็จ");
      window.location.reload();
    } else {
      const data = await res.json();
      alert(data.error || "อัปโหลดรูปไม่สำเร็จ");
    }
  };

  return (
    <>
      <Button Size="x-small" Appearance="secondary" onClick={handleButtonClick}>
        <Icon name="edit" className="text-red" />
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};

export default EditUserProfileButton;
