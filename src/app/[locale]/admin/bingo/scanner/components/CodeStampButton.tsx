"use client";

import { useState } from "react";
import Button from "@/components/Button";
import CodeStampModal from "@/app/[locale]/admin/bingo/scanner/components/CodeStampModal";
//import AlreadyStampDialog from "@/app/[locale]/admin/bingo/scanner/components/AlreadyStampDialog";

const CodeStampButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        icon="pin"
        label="สแตมป์ด้วยรหัส"
        Size="Small"
        Appearance="Tertiary"
        className="relative z-10"
        onClick={() => setOpen(true)}
      />
      <CodeStampModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CodeStampButton;
