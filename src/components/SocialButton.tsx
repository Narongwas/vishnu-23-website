"use client";

import { StyleableFC } from "@/lib/types/misc";
import { useState } from "react";
import Button from "@/components/Button";
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

type state = "Initial" | "Field" | "Final";

interface SocialButtonProps {
  platform: string;
  text?: string;
  setValue?: (value: string) => void;
  onEdit: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

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

const getIconColor = (state: state) => {
  if (state === "Initial") return "white";
  if (state === "Field") return "black";
  if (state === "Final") return "red";
  return "black";
};

const getPlaceholder = (platform: string) => {
  switch (platform.toLowerCase()) {
    case "line":
      return "LINE ID";
    case "instagram":
      return "username";
    case "facebook":
      return "Facebook";
    case "tiktok":
      return "@username";
    case "twitter":
    case "x":
      return "@Username";
    case "discord":
      return "username";
    case "youtube":
      return "@handle";
    case "twitch":
      return "username";
    case "github":
      return "Username";
    case "steam":
      return "Steam";
    case "riot":
      return "Username#123";
    case "roblox":
      return "@username";
    case "epic":
      return "Username";
    case "playstation":
      return "Online ID";
    default:
      return "Enter text";
  }
};

// Utility functions for each platform
function parseLine(input: string) {
  // LINE OA (starts with @) not accepted
  if (input.startsWith("@")) return null;
  // If it's a URL, extract LINE ID
  const urlMatch = input.match(/line\.me\/R\/ti\/p\/~([A-Za-z0-9._-]+)/);
  if (urlMatch) return urlMatch[1];
  // Accept as is if not a URL
  return input;
}

function parseInstagram(input: string) {
  // If it's a URL, extract username
  const urlMatch = input.match(/instagram\.com\/([A-Za-z0-9._]+)/);
  if (urlMatch) return urlMatch[1];
  // Remove @ if present
  return input.startsWith("@") ? input.slice(1) : input;
}

function parseFacebook(input: string) {
  // If it's a profile URL, return as is
  if (/facebook\.com\/[A-Za-z0-9.]+/.test(input)) return input;
  // Otherwise, treat as display name
  return input;
}

function parseTikTok(input: string) {
  // If it's a URL, extract username
  const urlMatch = input.match(/tiktok\.com\/@([A-Za-z0-9._]+)/);
  if (urlMatch) return "@" + urlMatch[1];
  // Add @ if missing
  return input.startsWith("@") ? input : "@" + input;
}

function parseTwitter(input: string) {
  // If it's a URL, extract username
  const urlMatch = input.match(/(?:twitter\.com|x\.com)\/([A-Za-z0-9_]+)/);
  if (urlMatch) return "@" + urlMatch[1];
  // Add @ if missing
  return input.startsWith("@") ? input : "@" + input;
}

function parseDiscord(input: string) {
  // If it's an invite URL
  if (/discord\.gg\/[A-Za-z0-9]+/.test(input)) return input;
  // Remove @ if present
  return input.startsWith("@") ? input.slice(1) : input;
}

function parseYouTube(input: string) {
  // If it's a URL, extract handle
  const urlMatch = input.match(/youtube\.com\/@([A-Za-z0-9._-]+)/);
  if (urlMatch) return "@" + urlMatch[1];
  // Add @ if missing
  return input.startsWith("@") ? input : "@" + input;
}

function parseTwitch(input: string) {
  // If it's a URL, extract username
  const urlMatch = input.match(/twitch\.tv\/([A-Za-z0-9_]+)/);
  if (urlMatch) return urlMatch[1];
  // Remove @ if present
  return input.startsWith("@") ? input.slice(1) : input;
}

function parseGitHub(input: string) {
  // If it's a URL, extract username
  const urlMatch = input.match(/github\.com\/([A-Za-z0-9-]+)/);
  if (urlMatch) return urlMatch[1];
  // Remove @ if present
  return input.startsWith("@") ? input.slice(1) : input;
}

function parseRoblox(input: string) {
  // If it's a URL, extract username or ID
  const urlMatch = input.match(/roblox\.com\/users\/(\d+)\/profile/);
  if (urlMatch) return urlMatch[1];
  // Add @ if missing
  return input.startsWith("@") ? input : "@" + input;
}

function parsePlayStation(input: string) {
  // If it's a URL, extract Online ID
  const urlMatch = input.match(
    /profile\.playstation\.com\/share\/([A-Za-z0-9_-]+)/
  );
  if (urlMatch) return urlMatch[1];
  // Accept as is
  return input;
}

// ...add more as needed...

function normalizeInput(platform: string, input: string) {
  switch (platform.toLowerCase()) {
    case "line":
      return parseLine(input);
    case "instagram":
      return parseInstagram(input);
    case "facebook":
      return parseFacebook(input);
    case "tiktok":
      return parseTikTok(input);
    case "twitter":
    case "x":
      return parseTwitter(input);
    case "discord":
      return parseDiscord(input);
    case "youtube":
      return parseYouTube(input);
    case "twitch":
      return parseTwitch(input);
    case "github":
      return parseGitHub(input);
    case "roblox":
      return parseRoblox(input);
    case "playstation":
      return parsePlayStation(input);
    // ...add more as needed...
    default:
      return input;
  }
}

const SocialButton: StyleableFC<SocialButtonProps> = ({
  platform,
  text,
  setValue,
  onFocus,
  onBlur,
}) => {
  const [state, setState] = useState<state>(text ? "Final" : "Initial");
  const [inputValue, setInputValue] = useState<string>(text || "");

  const IconComponent = platformIcons[platform.toLowerCase()];
  const iconColor = getIconColor(state);

  const icon = <IconComponent color={iconColor} />;

  return (
    <div className="flex items-center gap-2">
      {state === "Initial" && (
        <Button
          Size="small"
          Appearance="primary"
          onClick={() => setState("Field")}
          className="type-title-medium w-full"
        >
          {icon}
          Add
        </Button>
      )}
      {state === "Field" && (
        <div className="border-red flex w-full items-center gap-2 border bg-white px-4 py-2.25">
          {icon}
          <input
            className="type-body-large w-full px-1 text-black"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setValue?.(e.target.value);
            }}
            placeholder={getPlaceholder(platform)}
            autoFocus
            onFocus={onFocus}
            onBlur={() => {
              const normalized = normalizeInput(platform, inputValue) ?? "";
              setInputValue(normalized);
              setValue?.(normalized);
              if (inputValue.trim()) {
                setState("Final");
              } else {
                setState("Initial");
              }
              onBlur?.();
            }}
          />
        </div>
      )}
      {state === "Final" && (
        <Button
          Size="small"
          Appearance="secondary"
          onClick={() => setState("Field")}
          className="type-title-medium w-full"
        >
          {icon}
          <span className="inline-block max-w-[120px] truncate align-middle">
            {inputValue}
          </span>
        </Button>
      )}
    </div>
  );
};

export default SocialButton;
