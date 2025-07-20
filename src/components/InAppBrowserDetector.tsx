"use client";

import { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import InAppSpy from "inapp-spy";
import Image from "next/image";

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

  if (!isInApp || !showPrompt) {
    return null;
  }

  return (
    <Modal onClose={() => setShowPrompt(false)}>
      <Icon name="info" className="text-red" />
      <header className="type-headline-small text-center text-balance">
        เปิดเบราว์เซอร์ภายนอกเพื่อดำเนินการต่อ
      </header>
      <h2 className="type-body-medium text-left">
        กด ⋮ จุดสามจุด แล้วกด เปิดในเบราว์เซอร์
        จากนั้นจะสามารถเข้าสู่ระบบได้ตามปกติ
      </h2>
      <Image
        src="/modals/In-app-Browser.png"
        width={168}
        height={307}
        alt="open in browser instruction"
      />
    </Modal>
  );
};

export default InAppBrowserDetector;
