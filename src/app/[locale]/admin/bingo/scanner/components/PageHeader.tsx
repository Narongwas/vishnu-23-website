import BackButton from "@/app/[locale]/admin/bingo/components/BackButton";
import CodeStampButton from "@/app/[locale]/admin/bingo/scanner/components/CodeStampButton";

const PageHeader = () => {
  return (
    <div className="flex justify-between px-4 pt-4 pb-10">
      <BackButton />
      <CodeStampButton />
    </div>
  );
};

export default PageHeader;
