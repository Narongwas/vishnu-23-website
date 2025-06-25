"use client";

import { usePathname } from "next/navigation";
import Icon from "./Icon";

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
      className="flex flex-col items-center py-[6px] gap-1"
      aria-label={label}
    >
      <div className="relative flex justify-center items-center w-[56px] h-[32px]">
        {isActive && (
          <span
            className="absolute inset-0 rounded-[16px] bg-yellow"
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
