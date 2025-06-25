"use client";

export default function LogoutButton({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-red px-4 py-2"
      type="button"
    >
      <span className="font-icon text-white text-[1.25rem]">logout</span>
      <span className="text-white font-bold">ออกจากระบบ</span>
    </button>
  );
}
