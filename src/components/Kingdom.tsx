import { useTranslations } from "next-intl";

/**
 * The name of a Kingdom.
 *
 * @param letter The letter of the kingdom, e.g. "A", "B"
 * @param prefixed Whether to prefix the kingdom name with ก๊ก.
 */
const Kingdom: React.FC<{
  letter: string;
  prefixed?: boolean;
}> = ({ letter, prefixed }) => {
  const t = useTranslations("Common.Kingdom");
  const kingdom = t(letter);
  return prefixed ? t("kingdom", { kingdom }) : kingdom;
};

export default Kingdom;
