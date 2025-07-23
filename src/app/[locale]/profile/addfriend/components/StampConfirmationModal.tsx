"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Oval from "@/components/Oval";
import { StyleableFC } from "@/lib/types/misc";

type SuccessData = {
  firstName: string;
  lastName: string;
  uid: string;
  code: string;
};

type StampConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onStamp: () => void;
  isLoading: boolean;
  userData: SuccessData | null;
};

const StampConfirmationModal: StyleableFC<StampConfirmationModalProps> = ({
  isOpen,
  onClose,
  onStamp,
  isLoading,
  userData,
}) => {
  if (!isOpen || !userData) return null;

  return (
    <div className="inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-label="close modal"
      />
      {/* Modal Content */}
      <Oval className="fixed -bottom-120 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center justify-start gap-4 p-10">
        <Image
          src={"/decorating/profile/ProfileImage.svg"}
          alt="profile"
          width={108}
          height={108}
          className="h-27 w-27 rounded-full object-cover"
        />
        <p className="type-headline-small text-blue text-center">
          {userData.firstName} {userData.lastName}
        </p>
        <Button
          Size="medium"
          Appearance="primary"
          className="mb-4"
          onClick={onStamp}
          disabled={isLoading}
        >
          <p className="type-title-medium">
            {isLoading ? "Loading..." : "เพิ่มเพื่อน"}
          </p>
        </Button>
      </Oval>
    </div>
  );
};

export default StampConfirmationModal;
