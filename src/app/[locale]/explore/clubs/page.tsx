import BackButton from "@/components/BackButton";
import ClubPanel from "@/components/ClubPanel";
import SubPageHeader from "@/components/SubPageHeader";

export default function ClubPage() {
  return (
    <>
      <SubPageHeader curvedText="Explore" title="Clubs" />
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="Tertiary" />
      </div>
      <ClubPanel className="-mt-16" />
    </>
  );
}
