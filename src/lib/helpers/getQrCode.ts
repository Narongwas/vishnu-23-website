export default async function getQrCode() {
  const res = await fetch("/api/v1/friends/qr", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch QR code");
  }
  const data = await res.json();
  // data: { qrcode: string, code: string }
  return data;
}
