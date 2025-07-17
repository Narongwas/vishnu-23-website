export default async function getMe() {
  const res = await fetch("/api/v1/auth/me", {
    credentials: "include",
  });
  const data = await res.json();
  return data.user;
}
