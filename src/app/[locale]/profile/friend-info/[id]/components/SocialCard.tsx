"use client";

import { useCallback } from "react";

import Line from "@/components/socialIcon/Line";
import Instagram from "@/components/socialIcon/Instagram";
import Facebook from "@/components/socialIcon/Facebook";
import TikTok from "@/components/socialIcon/TikTok";
import Twitter from "@/components/socialIcon/Twitter";
import Discord from "@/components/socialIcon/Discord";
import Youtube from "@/components/socialIcon/Youtube";
import Twitch from "@/components/socialIcon/Twitch";
import GitHub from "@/components/socialIcon/GitHub";
import Steam from "@/components/socialIcon/Steam";
import Riot from "@/components/socialIcon/Riot";
import Epic from "@/components/socialIcon/Epic";
import Roblox from "@/components/socialIcon/Roblox";
import PlayStation from "@/components/socialIcon/PlayStation";

const platformIcons: Record<string, typeof Facebook> = {
  facebook: Facebook,
  twitch: Twitch,
  instagram: Instagram,
  discord: Discord,
  twitter: Twitter,
  youtube: Youtube,
  tiktok: TikTok,
  line: Line,
  github: GitHub,
  steam: Steam,
  riot: Riot,
  epic: Epic,
  roblox: Roblox,
  playstation: PlayStation,
};

interface SocialActionButtonProps {
  platform: string;
  value: string;
}

function getAction(
  platform: string,
  value: string
): { action: "link" | "copy" | null; url?: string; display: string } {
  const v = value.trim();
  switch (platform.toLowerCase()) {
    case "line":
      if (/^0\d{8,9}$/.test(v)) return { action: "copy", display: v }; // phone number
      if (/^https:\/\/line\.me\/R\/ti\/p\/~([A-Za-z0-9._-]+)$/.test(v)) {
        const id = v.match(/~([A-Za-z0-9._-]+)$/)?.[1] ?? v;
        return { action: "link", url: v, display: id };
      }
      if (!v.startsWith("@") && v.length > 0) {
        return {
          action: "link",
          url: `https://line.me/R/ti/p/~${v}`,
          display: v,
        };
      }
      return { action: null, display: v };
    case "instagram":
      if (/^https:\/\/(www\.)?instagram\.com\/([A-Za-z0-9._]+)/.test(v)) {
        const username = v.match(/instagram\.com\/([A-Za-z0-9._]+)/)?.[1] ?? v;
        return {
          action: "link",
          url: `https://www.instagram.com/${username}`,
          display: username,
        };
      }
      return {
        action: "link",
        url: `https://www.instagram.com/${v.replace(/^@/, "")}`,
        display: v.replace(/^@/, ""),
      };
    case "facebook":
      if (/^https:\/\/www\.facebook\.com\/[A-Za-z0-9.]+$/.test(v)) {
        return { action: "link", url: v, display: "Profile URL" };
      }
      return {
        action: "link",
        url: `https://www.facebook.com/search/people/?q=${encodeURIComponent(v)}`,
        display: v,
      };
    case "tiktok":
      if (/^https:\/\/www\.tiktok\.com\/@([A-Za-z0-9._]+)/.test(v)) {
        const username = v.match(/tiktok\.com\/@([A-Za-z0-9._]+)/)?.[1] ?? v;
        return {
          action: "link",
          url: `https://www.tiktok.com/@${username}`,
          display: "@" + username,
        };
      }
      return {
        action: "link",
        url: `https://www.tiktok.com/@${v.replace(/^@/, "")}`,
        display: v.startsWith("@") ? v : "@" + v,
      };
    case "twitter":
    case "x":
      if (/^https:\/\/(twitter|x)\.com\/([A-Za-z0-9_]+)$/.test(v)) {
        const username = v.match(/\.com\/([A-Za-z0-9_]+)$/)?.[1] ?? v;
        return {
          action: "link",
          url: `https://x.com/${username}`,
          display: "@" + username,
        };
      }
      return {
        action: "link",
        url: `https://x.com/${v.replace(/^@/, "")}`,
        display: v.startsWith("@") ? v : "@" + v,
      };
    case "discord":
      if (/^https:\/\/discord\.gg\/[A-Za-z0-9]+$/.test(v)) {
        return { action: "link", url: v, display: "Invite URL" };
      }
      return { action: "copy", display: v.replace(/^@/, "") };
    case "youtube":
      if (/^https:\/\/(www\.)?youtube\.com\/@([A-Za-z0-9._-]+)/.test(v)) {
        const handle = v.match(/youtube\.com\/@([A-Za-z0-9._-]+)/)?.[1] ?? v;
        return {
          action: "link",
          url: `https://www.youtube.com/@${handle}`,
          display: "@" + handle,
        };
      }
      return {
        action: "link",
        url: `https://www.youtube.com/@${v.replace(/^@/, "")}`,
        display: v.startsWith("@") ? v : "@" + v,
      };
    case "twitch":
      if (/^https:\/\/(www\.)?twitch\.tv\/([A-Za-z0-9_]+)/.test(v)) {
        const username = v.match(/twitch\.tv\/([A-Za-z0-9_]+)/)?.[1] ?? v;
        return {
          action: "link",
          url: `https://twitch.tv/${username}`,
          display: username,
        };
      }
      return {
        action: "link",
        url: `https://twitch.tv/${v.replace(/^@/, "")}`,
        display: v.replace(/^@/, ""),
      };
    case "github":
      if (/^https:\/\/github\.com\/([A-Za-z0-9-]+)$/.test(v)) {
        const username = v.match(/github\.com\/([A-Za-z0-9-]+)$/)?.[1] ?? v;
        return {
          action: "link",
          url: `https://github.com/${username}`,
          display: username,
        };
      }
      return {
        action: "link",
        url: `https://github.com/${v.replace(/^@/, "")}`,
        display: v.replace(/^@/, ""),
      };
    case "steam":
      if (/^\d{9}$/.test(v)) return { action: "copy", display: v }; // friend code
      if (/^https:\/\/s\.team\/p\/[a-z]{4}-[a-z]{4}\/[A-Z]{8}$/.test(v))
        return { action: "link", url: v, display: "Quick Invite" };
      if (/^https:\/\/steamcommunity\.com\/profiles\/\d{17}$/.test(v))
        return { action: "link", url: v, display: "Profile URL" };
      if (/^https:\/\/steamcommunity\.com\/id\/[A-Za-z0-9]+$/.test(v))
        return { action: "link", url: v, display: "Profile URL" };
      return { action: "copy", display: v };
    case "riot":
      return { action: "copy", display: v };
    case "roblox":
      if (/^https:\/\/www\.roblox\.com\/users\/\d{9}\/profile$/.test(v))
        return { action: "link", url: v, display: "Profile URL" };
      return {
        action: "link",
        url: `https://www.roblox.com/search/users?keyword=${encodeURIComponent(v.replace(/^@/, ""))}`,
        display: v.startsWith("@") ? v : "@" + v,
      };
    case "epic":
      return { action: "copy", display: v };
    case "playstation":
      if (
        /^https:\/\/profile\.playstation\.com\/share\/[A-Za-z0-9_-]+$/.test(v)
      ) {
        const id = v.match(/share\/([A-Za-z0-9_-]+)$/)?.[1] ?? v;
        return { action: "link", url: v, display: id };
      }
      return {
        action: "link",
        url: `https://profile.playstation.com/share/${v}`,
        display: v,
      };
    default:
      return { action: null, display: v };
  }
}

const SocialActionButton = ({ platform, value }: SocialActionButtonProps) => {
  const { action, url, display } = getAction(platform, value);
  const IconComponent = platformIcons[platform.toLowerCase()];
  const icon = <IconComponent color="red" />;
  const handleClick = useCallback(() => {
    if (action === "link" && url) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (action === "copy") {
      navigator.clipboard.writeText(display);
    }
  }, [action, url, display]);

  if (action === "link" && url) {
    return (
      <button
        type="button"
        className="bg-yellow text-red no-repeat relative z-10 bg-[url('/decorating/texture/fabric.png')] bg-cover px-5 py-4 bg-blend-soft-light"
        onClick={handleClick}
      >
        <span className="flex flex-col items-center justify-center gap-1.5">
          {icon}
          <span className="type-title-medium inline-block max-w-[120px] truncate align-middle">
            {display}
          </span>
        </span>
      </button>
    );
  }
  if (action === "copy") {
    return (
      <button
        type="button"
        className="rounded bg-gray-400 px-3 py-1 text-white"
        onClick={handleClick}
      >
        <span className="flex flex-col items-center justify-center gap-1.5">
          {icon}
          <span className="type-title-medium inline-block max-w-[120px] truncate align-middle">
            {display}
          </span>
        </span>
      </button>
    );
  }
  return null;
};

export default SocialActionButton;
