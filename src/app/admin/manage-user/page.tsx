"use client";

import getMe from "@/lib/helpers/getMe";
import React, { useEffect, useState } from "react";

type Person = {
  id: number;
  name: string;
  nickname: string;
  role: string;
};

const ManagePeople: React.FC = () => {
  const [userType, setUserType] = useState<"staff" | "camper">("staff");
  const [search, setSearch] = useState("");
  const [group, setGroup] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchPeople = async () => {
      const params = new URLSearchParams({
        userType,
        search,
        group,
      });
      try {
        const res = await fetch(`/api/v1/users?${params.toString()}`); // fetch get all route
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Person[] = await res.json();
        setPeople(data);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
    const fetchIsAdmin = async () => {
      const userProfile = await getMe();
      setIsAdmin(userProfile.roles === "admin");
    };
    fetchIsAdmin();
  }, [group, search, userType]);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 font-sans">
      <h1 className="mb-4 text-center text-2xl font-bold">MANAGE PEOPLE</h1>

      <div className="mb-4 flex justify-center space-x-2">
        {(["staff", "camper"] as const)
          .filter((ut) => isAdmin || ut === "camper")
          .map((ut) => (
            <button
              key={ut}
              onClick={() => setUserType(ut)}
              className={`rounded px-4 py-2 ${
                userType === ut ? "bg-red-600 text-white" : "border bg-white"
              }`}
            >
              {ut === "staff" ? "ขุนพล" : "จอมยุทธ์"}
            </button>
          ))}
      </div>

      <div className="mb-4 flex space-x-2">
        <input
          className="flex-1 rounded border px-3 py-1"
          placeholder="ค้นหา"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="rounded border px-2 py-1"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
        >
          <option value="A">ก๊กกะใจ๋</option>
          <option value="B">ก๊กไก่</option>
          <option value="C">ก๊กแก</option>
        </select>
      </div>

      <table className="w-full border">
        <thead className="bg-yellow-200">
          <tr>
            <th></th>
            <th className="p-2 text-left">ชื่อ-สกุล</th>
            <th className="p-2 text-left">ก๊ก</th>
            <th className="p-2 text-left">ตำแหน่ง</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.id} className="border-t hover:bg-yellow-100">
              <td className="text-center"></td>
              <td className="p-2">{person.name}</td>
              <td className="p-2">{person.nickname}</td>
              <td className="p-2">{person.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePeople;
