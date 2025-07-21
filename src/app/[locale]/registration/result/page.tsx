import RegistrationInfo from "@/app/[locale]/registration/components/RegistrationInfo";
import AllPageSponsorFooter from "@/components/AllPageSponsorFooter";
import BackgroundWithNoise from "@/components/BackgroundWithNoise";

export default function RegistrationResultPage() {
  return (
    <BackgroundWithNoise className="from-yellow to-yellow-white bg-gradient-to-b">
      <div className="relative z-10 mx-auto flex h-full max-w-200 flex-col items-center px-4 text-center">
        <RegistrationInfo />
        <AllPageSponsorFooter className="mt-17" />
      </div>
    </BackgroundWithNoise>
  );
}
