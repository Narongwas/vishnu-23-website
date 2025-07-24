"use client";

import Button from "@/components/Button";
import Icon from "@/components/Icon";
import { useRouter } from "@/i18n/navigation";
import { StyleableFC } from "@/lib/types/misc";

/**
 * BackButton component that navigates to a specified href when clicked.
 * @param {string} props.variant - The appearance variant of the button.
 * @param {string} props.href - The URL to navigate to when the button is clicked
 */
type BackButtonProps = {
  variant: "primary" | "secondary" | "tertiary" | "secondary-variant";
  href: string;
};

const BackButton: StyleableFC<Pick<BackButtonProps, "variant" | "href">> = ({
  variant,
  href,
}) => {
  const router = useRouter();
  return (
    <Button Appearance={variant} Size="small" onClick={() => router.push(href)}>
      <Icon name="arrow_back" />
    </Button>
  );
};

export default BackButton;
