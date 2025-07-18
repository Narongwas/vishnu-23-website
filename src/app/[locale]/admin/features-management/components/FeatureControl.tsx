"use client";

import ListItem from "@/app/[locale]/admin/features-management/components/ListItem";
import Switch from "@/app/[locale]/admin/features-management/components/Switch";
import PageAction from "@/components/PageAction";
import { useEffect, useRef, useState } from "react";

type Flag = {
  id: string;
  featureName: string;
  enabled: boolean;
};

export default function FeatureControl() {
  const [flags, setFlags] = useState<Flag[] | null>(null);
  const [editedFlags, setEditedFlags] = useState<Flag[] | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const displayedFlags = editedFlags ?? flags;

  const toggleLocalFlag = (id: string) => {
    setEditedFlags((prev) => {
      const baseFlags = prev ?? flags;
      if (!baseFlags) return prev;
      return baseFlags.map((flag) =>
        flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
      );
    });
  };

  const handleSave = async () => {
    if (!editedFlags) return;
    try {
      const changedFlags = editedFlags.filter((editedFlag) => {
        const originalFlag = flags?.find((f) => f.id === editedFlag.id);
        return originalFlag && originalFlag.enabled !== editedFlag.enabled;
      });

      await Promise.all(
        changedFlags.map((flag) =>
          fetch(`/api/v1/feature-flags/${flag.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ enabled: flag.enabled }),
          })
        )
      );

      setFlags(editedFlags);
      setEditedFlags(null);
      alert("toggle flags successfully!");
    } catch (error) {
      console.error("Failed to save flags:", error);
    }
  };

  useEffect(() => {
    const fetchFlags = async () => {
      try {
        const res = await fetch("/api/v1/feature-flags");
        if (res.ok) {
          const data = await res.json();
          setFlags(data);
        }
      } catch (error) {
        console.error("Error fetching flags:", error);
      }
    };
    fetchFlags();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setEditedFlags(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className="type-body-large relative z-10">
      <ListItem className="bg-yellow fabric-texture border-b-black font-bold">
        ชื่อฟีเจอร์
      </ListItem>
      {displayedFlags?.map((flag) => (
        <ListItem
          key={flag.id}
          className="type-body-large flex items-center justify-between"
        >
          <span>{flag.featureName}</span>
          <Switch
            checked={flag.enabled}
            onChange={() => toggleLocalFlag(flag.id)}
          />
        </ListItem>
      ))}

      {editedFlags && (
        <PageAction
          text="บันทึก"
          icon="check"
          className="absolute top-60"
          onClick={handleSave}
        />
      )}
    </div>
  );
}
