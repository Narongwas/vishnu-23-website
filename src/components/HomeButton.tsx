import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { Link } from "@/i18n/navigation";

export default function HomeButton() {
  return (
    <Link href="/">
      <Button Size="small" Appearance="primary">
        <Icon name="home" />
      </Button>
    </Link>
  );
}
