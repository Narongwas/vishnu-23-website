import FacultyMap from "@/app/[locale]/explore/map/components/FacultyMap";
import BackButton from "@/components/BackButton";
import SubPageHeader from "@/components/SubPageHeader";

export default function Map() {
  return (
    <>
      <SubPageHeader curvedText="Explore" title="Map" />
      <div className="absolute top-0 z-10 flex w-full items-center justify-between py-4">
        <BackButton variants="Tertiary" />
      </div>
      <div className="relative z-10 -mt-16 flex flex-col items-center gap-4">
        <FacultyMap />
      </div>
    </>
  );
}
