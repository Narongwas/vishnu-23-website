import Icon from "@/components/Icon";
import MountainBackground from "@/components/MountainBackground";
import TopLevelPageHeader from "@/components/TopLevelPageHeader";
import cn from "@/lib/helpers/cn";
import Link from "next/link";

const menuList = [
  {
    icon: "groups",
    label: "รายชื่อคนในค่าย",
    link: "/admin/manage-user",
  },
  {
    icon: "qr_code_scanner",
    label: "บิงโก",
    link: "/admin/bingo",
  },
  {
    icon: "temple_buddhist",
    label: "หอทำนายชะตาฯ",
    link: "/admin/manage-predictions",
  },
  {
    icon: "flag",
    label: "เปิด/ปิดฟีเจอร์",
    link: "/admin/features-management",
  },
  {
    icon: "leaderboard",
    label: "เพิ่ม/ลดคะแนน",
    link: "/admin/scores",
  },
];

export default function AdminPage() {
  return (
    <>
      <TopLevelPageHeader
        title="Admin"
        chineseText="事务"
        subtitle="ระบบหลังบ้าน สำหรับการจัดการข้อมูลและควบคุมระบบต่าง ๆ"
      />

      <MountainBackground
        className="absolute top-10 left-0 h-full w-full"
        background="bg-blue"
      />

      <div className="relative z-20 mx-auto mt-20 grid w-full grid-cols-2 gap-4">
        {menuList.map((menu, index) => (
          <Link
            href={menu.link}
            key={index}
            className={cn(
              "flex flex-col items-center bg-white p-4 text-center",
              index === 0 && "col-span-2"
            )}
          >
            <Icon name={menu.icon} className="text-red mb-2" size={32} />
            <p className="type-title-medium text-red">{menu.label}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
