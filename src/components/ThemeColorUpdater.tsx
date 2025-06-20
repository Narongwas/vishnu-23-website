"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

//Update meta theme-color based on the top-edge element's CSS variable
export default function ThemeColorUpdater() {
  const pathname = usePathname();

  useEffect(() => {
    const updateThemeColor = () => {
      const topEdge = document.querySelector(".top-edge") as HTMLElement | null;
      if (!topEdge) return;

      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      console.log("metaThemeColor found:", metaThemeColor);

      if (!metaThemeColor) return;

      const themeColor = getComputedStyle(topEdge)
        .getPropertyValue("--theme-color")
        .trim();
      console.log("Setting theme-color to:", themeColor);

      if (themeColor) {
        metaThemeColor.setAttribute("content", themeColor);
        // For debugging:
        console.log(
          "Meta tag content now:",
          metaThemeColor.getAttribute("content")
        );
      }
    };

    requestAnimationFrame(updateThemeColor);
    const timeoutId = setTimeout(updateThemeColor, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname]);
  return null;
}
