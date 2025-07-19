"use client";

import Icon from "@/components/Icon";
import Interactive from "@/components/Interactive";
import { usePathname } from "@/i18n/navigation";
import cn from "@/lib/helpers/cn";

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
  const isActive = pathname === href || pathname.startsWith(href + "/");
  return (
    <Interactive
      href={href}
      className="text-yellow-white flex flex-col items-center gap-1 py-1.5"
    >
      <div className="relative flex h-8 w-14 items-center justify-center">
        {isActive && (
          <span
            aria-hidden
            className="bg-yellow absolute inset-0 rounded-2xl"
          />
        )}
        <Icon
          name={icon}
          size={24}
          className={cn("z-10", isActive && "text-red")}
        />
      </div>
      <span className="type-label-medium">{label}</span>
    </Interactive>
  );
}
