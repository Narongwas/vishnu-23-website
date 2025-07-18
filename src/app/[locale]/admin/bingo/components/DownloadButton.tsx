import Button from "@/components/Button";
import Icon from "@/components/Icon";

const DownloadButton = () => {
  return (
    <Button Size="Small" Appearance="Tertiary" className="relative z-10">
      <Icon name="download" />
    </Button>
  );
};

export default DownloadButton;
