export default function emailToId(email: string) {
  const studentId = parseInt(email.split("@")[0]);
  return studentId;
}
