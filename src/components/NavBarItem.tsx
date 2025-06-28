"use client";

import Icon from "@/components/Icon";
import { usePathname } from "next/navigation";

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
  const segments = pathname.split("/");
  const pathWithoutLocale = "/" + segments.slice(2).join("/"); // slice(2) removes ['', locale]
  const normalizedPath =
    pathWithoutLocale === "/" ? "/" : pathWithoutLocale.replace(/\/$/, "");
  const isActive = normalizedPath === href;

  return (
    <a
      href={href}
      className="flex flex-col items-center gap-1 py-1.5"
      aria-label={label}
    >
      <div className="relative flex h-8 w-14 items-center justify-center">
        {isActive && (
          <span
            className="bg-yellow absolute inset-0 rounded-2xl"
            aria-hidden="true"
          />
        )}
        <Icon
          name={icon}
          size={24}
          className={isActive ? "text-red z-10" : "text-yellow-white z-10"}
        />
      </div>
      <span className="type-label-medium text-yellow-white">{label}</span>
    </a>
  );
}
