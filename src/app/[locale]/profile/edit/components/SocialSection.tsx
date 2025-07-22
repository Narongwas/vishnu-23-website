"use client";

import { useState } from "react";
import { User } from "@/lib/types/users";
import SocialButton from "@/app/[locale]/profile/edit/components/SocialButton";

interface SocialSectionProps {
  user: User;
}

const SocialSection = ({ user }: SocialSectionProps) => {
  // สุ่มค่า social contact ถ้ายังไม่มี
  const [twitterValue, setTwitterValue] = useState<string>(
    user?.contact?.twitter || ""
  );
  const [facebookValue, setFacebookValue] = useState<string>(
    user?.contact?.facebook || ""
  );
  const [instagramValue, setInstagramValue] = useState<string>(
    user?.contact?.instagram || ""
  );

  return (
    <div>
      <div className="type-display-small grid grid-cols-2 items-center justify-center gap-4 text-white">
        <SocialButton
          platform="Twitter"
          initialValue={twitterValue}
          onChange={setTwitterValue}
        />
        <SocialButton
          platform="facebook"
          initialValue={facebookValue}
          onChange={setFacebookValue}
        />
        <SocialButton
          platform="instagram"
          initialValue={instagramValue}
          onChange={setInstagramValue}
        />
      </div>
    </div>
  );
};

export default SocialSection;
