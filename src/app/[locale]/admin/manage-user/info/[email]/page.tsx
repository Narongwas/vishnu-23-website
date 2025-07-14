"use client";
import React, { useEffect, useState } from "react";
import { User } from "@/lib/types/users";
import { useParams } from "next/navigation";
export default function Page() {
  const [info, setInfo] = useState<User | null>(null);
  const params = useParams();
  const email = params?.email; // this is the dynamic part from the URL
  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch(`/api/v1/users/info/?email=${email}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log("data : ", data);
        setInfo(data.users);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchInfo();
  }, [email]);
  return (
    <>
      firstName : {info?.firstName} <br />
      lastName : {info?.lastName} <br />
      nickName : {info?.nickname} <br />
      email : {info?.email} <br />
      department : {info?.department} <br />
      group : {info?.group} <br />
      role : {info?.role} <br />
      sensitive info :
      {info?.sensitiveInfo
        ? JSON.stringify(info.sensitiveInfo)
        : "you can't access sensitive info!"}
    </>
  );
}
