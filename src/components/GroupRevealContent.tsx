"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";

export default function GroupRevealClient() {
  const { token } = useAuth();
  const [group, setGroup] = useState<string | null>("");
  useEffect(() => {
    if (!token) return;
    const fetchData = async () => {
      const res = await fetch("/api/v1/group", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch group");
      const data = await res.json();
      console.log(data.group);
      setGroup(data.group);
    };
    fetchData();
  }, [token]);
  return (
    <div>
      Congratulations your group is <br />
      Group : {group}
    </div>
  );
}
