"use client";

import { useState } from "react";
import { User } from "@/lib/types/users";
import SocialButton from "@/components/SocialButton";
import ConfirmationPageAction from "@/app/[locale]/profile/edit/components/ConfirmationPageAction";
interface SocialSectionProps {
  user: User;
}

const SocialSection = ({ user }: SocialSectionProps) => {
  const handleSubmit = async () => {
    // Handle the submit logic here, e.g., update user contact information
    try {
      const res = await fetch("/api/v1/users/profile/contact", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: {
            twitter: twitterValue,
            facebook: facebookValue,
            instagram: instagramValue,
            discord: discordValue,
            tiktok: tiktokValue,
            youtube: youtubeValue,
            twitch: twitchValue,
            github: githubValue,
            steam: steamValue,
            riot: riotValue,
            epic: epicValue,
            roblox: robloxValue,
            playstation: playstationValue,
            line: lineValue,
          },
        }),
      });

      if (!res.ok) {
        // handle error
        const error = await res.json();
        alert(error.error || "Update failed");
        return;
      }

      alert("Contact updated!");
    } catch (err) {
      alert("Error updating contact");
      console.error(err);
    }
  };

  const [twitterValue, setTwitterValue] = useState<string>(
    user?.contact?.twitter || ""
  );
  const [facebookValue, setFacebookValue] = useState<string>(
    user?.contact?.facebook || ""
  );
  const [instagramValue, setInstagramValue] = useState<string>(
    user?.contact?.instagram || ""
  );
  const [discordValue, setDiscordValue] = useState<string>(
    user?.contact?.discord || ""
  );
  const [tiktokValue, setTiktokValue] = useState<string>(
    user?.contact?.tiktok || ""
  );
  const [youtubeValue, setYoutubeValue] = useState<string>(
    user?.contact?.youtube || ""
  );
  const [twitchValue, setTwitchValue] = useState<string>(
    user?.contact?.twitch || ""
  );
  const [githubValue, setGithubValue] = useState<string>(
    user?.contact?.github || ""
  );
  const [steamValue, setSteamValue] = useState<string>(
    user?.contact?.steam || ""
  );
  const [riotValue, setRiotValue] = useState<string>(user?.contact?.riot || "");
  const [epicValue, setEpicValue] = useState<string>(user?.contact?.epic || "");
  const [robloxValue, setRobloxValue] = useState<string>(
    user?.contact?.roblox || ""
  );
  const [playstationValue, setPlaystationValue] = useState<string>(
    user?.contact?.playstation || ""
  );
  const [lineValue, setLineValue] = useState<string>(user?.contact?.line || "");
  const [isAnyFocused, setIsAnyFocused] = useState(false);

  const handleFocus = () => setIsAnyFocused(true);
  const handleBlur = () => setIsAnyFocused(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="type-display-small grid grid-cols-2 items-center justify-center gap-4 text-white">
        <SocialButton
          platform="line"
          text={lineValue}
          setValue={setLineValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="instagram"
          text={instagramValue}
          setValue={setInstagramValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="facebook"
          text={facebookValue}
          setValue={setFacebookValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="TikTok"
          text={tiktokValue}
          setValue={setTiktokValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="Twitter"
          text={twitterValue}
          setValue={setTwitterValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className="type-display-small grid grid-cols-2 items-center justify-center gap-4 text-white">
        <SocialButton
          platform="discord"
          text={discordValue}
          setValue={setDiscordValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="youtube"
          text={youtubeValue}
          setValue={setYoutubeValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="twitch"
          text={twitchValue}
          setValue={setTwitchValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="github"
          text={githubValue}
          setValue={setGithubValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      <div className="type-display-small grid grid-cols-2 items-center justify-center gap-4 text-white">
        <SocialButton
          platform="steam"
          text={steamValue}
          setValue={setSteamValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="riot"
          text={riotValue}
          setValue={setRiotValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="roblox"
          text={robloxValue}
          setValue={setRobloxValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="epic"
          text={epicValue}
          setValue={setEpicValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        <SocialButton
          platform="playstation"
          text={playstationValue}
          setValue={setPlaystationValue}
          onEdit={false}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {!isAnyFocused && <ConfirmationPageAction Action={handleSubmit} />}
    </div>
  );
};

export default SocialSection;
