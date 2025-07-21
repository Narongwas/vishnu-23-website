"use client";

import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import InAppSpy from "inapp-spy";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import DeviceDetector from "device-detector-js";

const InAppBrowserDetector = () => {
  const [isInApp, setIsInApp] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const t = useTranslations("Home.InAppBrowser");

  useEffect(() => {
    const iOSDevice = ["iPhone", "iPad"];

    const detectInApp = async () => {
      try {
        const { isInApp: detected, ua } = InAppSpy();
        const deviceDetector = new DeviceDetector();
        const device = deviceDetector.parse(ua);

        setIsInApp(detected);
        // alert(device.os?.name);

        if (detected) {
          if (iOSDevice.includes(device.os?.name ?? "")) {
            setTimeout(() => setShowPrompt(true), 1000);
          } else {
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
        }
      } catch (error) {
        console.error("Failed to detect in-app browser:", error);
      }
    };

    detectInApp();
  }, []);

  if (!isInApp && !showPrompt) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Modal onClose={() => setShowPrompt(false)}>
        <Icon name="info" className="text-red" size={24} />
        <header className="type-headline-small text-center text-balance">
          {t("title")}
        </header>
        <h2 className="type-body-medium text-left">
          {t.rich("desc", {
            dots: () => (
              <span className="inline-block align-middle">
                <Icon name="more_vert" />
              </span>
            ),
            strong: (chunks) => <strong>{chunks}</strong>,
          })}
        </h2>
        <Image
          src="/modals/In-app-Browser.png"
          width={168}
          height={307}
          alt={t("alt")}
        />
      </Modal>
    </div>
  );
};

export default InAppBrowserDetector;
