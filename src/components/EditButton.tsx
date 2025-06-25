"use client";

export default function EditButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-yellow px-4 py-2"
      type="button"
    >
      <span className="font-icon text-red text-[1.25rem]">edit</span>
      <span className="text-red font-bold">แก้ไข</span>
    </button>
  );
}
