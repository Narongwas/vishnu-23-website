"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import cn from "@/lib/helpers/cn";
import { StyleableFC } from "@/lib/types/misc";
import facultyMap from "@/public/map/Faculty.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const buildings = [
  {
    key: "larngear",
    style: "right-[20%] top-[23%] w-[18%] h-[18%]",
    href: "/explore/map/larngear",
    label: "ลานเกียร์",
  },
  {
    key: "eng-3",
    style: "left-[33%] top-[20%] w-[28%] h-[22%]",
    href: "/explore/map/eng-3",
    label: "ตึก 3",
  },
  {
    key: "en-100",
    style: "right-[8%] top-[45%] w-[22%] h-[22%]",
    href: "/explore/map/en-100",
    label: "อาคารวิศวฯ 100 ปี",
  },
];

const FacultyMap: StyleableFC = ({ className, style }) => {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleClick = (target: string) => {
    setSelected(target);
    setIsTransitioning(true);

    router.push(`/explore/map/${target}`);
  };

  const backgroundOverlay =
    "border-2 border-red bg-yellow mix-blend-overlay z-15";

  return (
    <div
      className={cn("relative flex flex-col items-center gap-4", className)}
      style={style}
    >
      {isTransitioning && <div className="fixed inset-0 z-10 bg-black/30" />}

      <figure className="relative">
        <Image src={facultyMap} alt="Map of คณะวิศวฯ" priority />
        {buildings.map((building) => (
          <button
            key={building.key}
            onClick={() => handleClick(building.key)}
            className={cn(
              "absolute",
              building.style,
              selected === building.key && backgroundOverlay
            )}
          />
        ))}
      </figure>

      <div className="justify-left text-red flex w-full items-center gap-2.5 pb-3">
        <Icon name="touch_app" size={24} />
        <p className="type-title-medium">แตะบนอาคารที่ต้องการดูแผนที่ชมรม</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        {buildings.map((building, index) => (
          <Button
            key={index}
            Appearance="Primary"
            Size="Small"
            className="type-title-medium"
            onClick={() => handleClick(building.key)}
          >
            {building.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FacultyMap;
