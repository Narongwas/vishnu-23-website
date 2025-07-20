"use client";

import { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
import InAppSpy from "inapp-spy";
import Button from "@/components/Button";
import Icon from "@/components/Icon";

const InAppBrowserDetector = () => {
  const [isInApp, setIsInApp] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  //   const t = useTranslations("Common.InAppBrowser");

  useEffect(() => {
    // Dynamic import to avoid SSR issues
    const detectInApp = async () => {
      try {
        const { isInApp: detected, appKey } = InAppSpy();

        setIsInApp(detected);

        if (detected) {
          // Show prompt after a short delay to avoid jarring experience
          setTimeout(() => setShowPrompt(true), 1000);
          alert(appKey);

          // Auto-redirect attempt for Android
          const url = window.location.href;
          const intentLink = `intent:${url}#Intent;end`;

          // Try automatic redirect first
          try {
            window.location.replace(intentLink);
          } catch (error) {
            console.log(
              `Auto-redirect failed, showing manual prompt: ${error}`
            );
          }
        }
      } catch (error) {
        console.error("Failed to detect in-app browser:", error);
      }
    };

    detectInApp();
  }, []);

  const handleOpenExternal = () => {
    const url = window.location.href;
    const intentLink = `intent:${url}#Intent;end`;

    // Create a temporary link and click it
    const link = document.createElement("a");
    link.href = intentLink;
    link.target = "_blank";
    link.click();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
  };

  if (!isInApp || !showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center gap-3">
          <Icon name="open_in_browser" className="text-orange-500" size={24} />
          <h3 className="type-title-medium text-gray-900">open in browser</h3>
        </div>

        <p className="type-body-medium mb-6 text-gray-600">
          just open in browser bro this shi no work in in-app
        </p>

        <div className="flex gap-3">
          <Button
            onClick={handleOpenExternal}
            Size="medium"
            Appearance="primary"
            className="flex-1"
          >
            <Icon name="launch" />
            open in browser
          </Button>

          <Button
            onClick={handleDismiss}
            Size="medium"
            Appearance="secondary"
            className="flex-1"
          >
            continue here
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InAppBrowserDetector;
