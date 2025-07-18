import Button from "@/components/Button";
import Icon from "@/components/Icon";

const handleDownloadCSV = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bingo/scores/csv`
    );
    if (!res.ok) {
      alert("ดาวน์โหลดข้อมูลไม่สำเร็จ");
      return;
    }

    //  รับข้อมูลมาเป็น blob โดยตรง (สำคัญมาก)
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "bingo-scores.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Download failed:", error);
    alert("เกิดข้อผิดพลาดในการดาวน์โหลด");
  }
};

const DownloadButton = () => {
  return (
    <Button
      Size="small"
      Appearance="tertiary"
      className="relative z-10"
      onClick={handleDownloadCSV}
    >
      <Icon name="download" />
    </Button>
  );
};

export default DownloadButton;
