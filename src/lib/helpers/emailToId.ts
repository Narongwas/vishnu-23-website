export default function emailToId(email: string) {
  const studentId = email.split("@")[0];
  return studentId;
}
