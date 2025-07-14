import BackButton from "@/components/BackButton";
import ClubPanel from "@/components/ClubPanel";
import SubPageHeader from "@/components/SubPageHeader";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";

export default function ClubPage() {
  return (
    <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
      <div className="mx-auto min-h-screen max-w-200 px-4">
        <SubPageHeader curvedText="Explore" title="Clubs" />
        <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
          <BackButton variants="Tertiary" />
        </div>
        <ClubPanel />
      </div>
    </BackgroundWithNoise>
  );
}
