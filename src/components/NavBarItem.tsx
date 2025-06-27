"use client";

import { usePathname } from "next/navigation";
import Icon from "@/components/Icon";

export default function NavBarItem({
  icon,
  label,
  href,
}: {
  icon: string;
  label: string;
  href: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <a
      href={href}
      className="flex flex-col items-center gap-1 py-[6px]"
      aria-label={label}
    >
      <div className="relative flex h-[32px] w-[56px] items-center justify-center">
        {isActive && (
          <span
            className="bg-yellow absolute inset-0 rounded-[16px]"
            aria-hidden="true"
          />
        )}
        <Icon
          name={icon}
          size={24}
          className={isActive ? "text-red z-10" : "text-yellow-white z-10"}
        />
      </div>
      <span className="type-label-medium text-yellow-white tracking-label-small">
        {label}
      </span>
    </a>
  );
}
