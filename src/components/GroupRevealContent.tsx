"use client";
import { useAuth } from "@/contexts/AuthContext";

export default function GroupRevealClient() {
  const { user } = useAuth();
  return <div>Welcome, {user?.email}</div>;
}
