import MountainBackground from "@/components/MountainBackground";
import NavBar from "@/components/NavBar";
import NavigationCard from "@/components/NavigationCard";
import TopLevelPageHeader from "@/components/TopLevelPageHeader";

import clubs from "@/public/navigation/Clubs.png";
import map from "@/public/navigation/Map.png";
import presentation from "@/public/navigation/Presentation.png";

const cards = [
  {
    image: map,
    title: "Map",
    label: "เปิดแผนที่ท่องโลกวิศวะ\nตามหาเส้นทางสู่ชมรมในตำนาน",
    link: "/explore/map",
  },
  {
    image: clubs,
    title: "Clubs",
    label: "เยี่ยมชมทุกชมรม และดูกันว่า\nชมรมไหนดีที่สุดสำหรับน้อง",
    link: "/explore/clubs",
  },
  {
    image: presentation,
    title: "Presentation",
    label: "ดาวน์โหลดสไลด์ เพื่อไม่พลาด\nข้อมูลสำคัญของคณะ",
    link: "/explore/presentation",
  },
];

export default function ExplorePage() {
  return (
    <>
      <TopLevelPageHeader
        title="Explore"
        chineseText="探图"
        subtitle="อยากรู้จักชมรม เปิดแม็พ หรือแค่อยากโหลดสไลด์ มาดูกันว่าวิศวะมีอะไรให้น้องบ้าง"
      />

      <MountainBackground
        className="absolute -top-72 left-0 h-full w-full"
        background="bg-blue"
      />

      <div className="relative z-15 mt-4 flex w-full flex-col items-center gap-4 px-4 pb-10">
        {cards.map((card, index) => (
          <NavigationCard
            key={index}
            image={card.image}
            title={card.title}
            label={card.label}
            link={card.link}
          />
        ))}
      </div>

      <NavBar />
    </>
  );
}
