import MountainBackground from "@/components/MountainBackground";
import NavBar from "@/components/NavBar";
import NavigationCard from "@/components/NavigationCard";
import TopLevelPageHeader from "@/components/TopLevelPageHeader";
import bingo from "@/public/navigation/Bingo.png";
import prediction from "@/public/navigation/Prediction.png";

const cards = [
  {
    image: bingo,
    title: "Bingo",
    label:
      "ร่วมกิจกรรมชมรมเพื่อเปิดช่องบนกระดาน\nใครจะเป็นผู้พิชิต 5 ช่องในตำนาน?",
    link: "/games/bingo",
  },
  {
    image: prediction,
    title: "Predictions",
    label: "ทดสอบดวงชะตาของน้องใน\nหอทำนายชะตาสวรรค์",
    link: "/games/predictions",
  },
];

export default function GamePage() {
  return (
    <>
      <TopLevelPageHeader
        title="Games"
        titleColor="text-white"
        chineseText="占戏"
        chineseColor="text-yellow"
        subtitle="น้องจะนำพาความยิ่งใหญ่ สู่ก๊กของน้องได้หรือไม่"
        subtitleColor="text-white"
        background="bg-white/10 saturate-0 opacity-30"
      />

      <MountainBackground
        className="absolute -top-60 left-0 h-full w-full opacity-50"
        background=""
      />

      <div className="relative z-15 mt-4 flex w-full flex-col items-center gap-4 px-4 pb-10">
        {cards.map((card, index) => (
          <NavigationCard
            key={index}
            image={card.image}
            title={card.title}
            label={card.label}
            link={card.link}
            ovalBg="bg-gradient-to-b from-blue to-gray-500"
            titleColor="text-yellow"
            labelColor="text-white"
          />
        ))}
      </div>

      <NavBar />
    </>
  );
}
