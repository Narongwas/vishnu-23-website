import Button from "@/components/Button";
import Icon from "@/components/Icon";

type SortButtonProps = {
  sortType: "id" | "score";
  onToggle: () => void;
};

const SortButton = ({ sortType, onToggle }: SortButtonProps) => (
  <Button
    Size="small"
    Appearance="tertiary"
    className="relative z-10"
    onClick={onToggle}
  >
    <Icon name={sortType === "id" ? "sort_by_alpha" : "format_list_numbered"} />
  </Button>
);

export default SortButton;
