"use client";

import React, { useEffect, useState } from "react";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  email: string; // unique
  department: string;
  group: string;
  role: string;
  tier: string;
  sensitiveInfo?: Record<string, string>; // only for camper
  friends: string[]; // list of Firestore document IDs
}

const ManagePeople: React.FC = () => {
  const [userType, setUserType] = useState<string>("staff");
  const [search, setSearch] = useState<string>("");
  const [group, setGroup] = useState<string>("");
  const [people, setPeople] = useState<User[]>([]);

  useEffect(() => {
    const fetchPeople = async () => {
      const params = new URLSearchParams();
      if (userType != "") params.append("userType", userType);
      if (search != "") params.append("search", search);
      if (group != "") params.append("group", group);

      try {
        const res = await fetch(`/api/v1/users?${params.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        console.log("users : ", data.users);
        setPeople(data.users);
      } catch (error) {
        console.error("Error fetching people:", error);
      }
    };
    fetchPeople();
  }, [group, search, userType]);

  return (
    <div className="min-h-screen bg-yellow-50 p-4 font-sans">
      <h1 className="mb-4 text-center text-2xl font-bold">MANAGE PEOPLE</h1>

      <div className="mb-4 flex justify-center space-x-2">
        {(["staff", "camper"] as const).map((ut) => (
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
          <option value="">ทั้งหมด</option>
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
            <th className="p-2 text-left">อีเมล</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person: User) => (
            <tr key={person.firstName} className="border-t hover:bg-yellow-100">
              <td className="text-center"></td>
              <td className="p-2">
                {person.firstName + " " + person.lastName}
              </td>
              <td className="p-2">{person.group}</td>
              <td className="p-2">{person.role}</td>
              <td className="p-2">{person.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePeople;
