"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CodeStampModal from "@/app/[locale]/admin/bingo/scanner/components/CodeStampModal";
//import AlreadyStampDialog from "@/app/[locale]/admin/bingo/scanner/components/AlreadyStampDialog";
import Icon from "@/components/Icon";

const CodeStampButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        Size="Small"
        Appearance="Tertiary"
        className="relative z-10"
        onClick={() => setOpen(true)}
      >
        <Icon name="pin" />
        <p className="type-title-medium">แสตมป์ด้วยรหัส</p>
      </Button>
      <CodeStampModal ClubId={0} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CodeStampButton;
