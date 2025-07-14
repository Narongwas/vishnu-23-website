import BackButton from "@/components/BackButton";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import ClubPanel from "@/components/ClubPanel";
import SubPageHeader from "@/components/SubPageHeader";

export default function ClubPage() {
  return (
    <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
      <div className="mx-auto min-h-screen max-w-200 px-4">
        <SubPageHeader curvedText="Explore" title="Clubs" />
        <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
          <BackButton variants="Tertiary" />
        </div>
        <ClubPanel className="-mt-16" />
      </div>
    </BackgroundWithNoise>
  );
}
