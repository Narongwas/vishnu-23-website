import BackgroundWithNoise from "@/components/BackgroundWithNoise";
import cn from "@/lib/helpers/cn";
import { ReactNode } from "react";

type ProfileWrapperProps = {
  children: ReactNode;
  className?: string;
};

const ProfileWrapper = ({ children, className }: ProfileWrapperProps) => {
  return (
    <div className="relative min-h-screen w-full">
      <BackgroundWithNoise
        className={cn(
          "from-red via-orange to-orange fixed inset-0 z-0 bg-gradient-to-b [background-size:100%_50%] bg-top bg-no-repeat",
          className
        )}
      >
        {/* Empty div as BackgroundWithNoise requires children */}
        <div />
      </BackgroundWithNoise>

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-md overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default ProfileWrapper;
