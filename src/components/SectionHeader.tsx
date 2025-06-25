import cn from "@/lib/helpers/cn";

export default function SectionHeader({
  title,
  classname,
}: {
  title: string;
  classname?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 h-10 bg-[url('/decorating/shapes/flag.svg')] bg-no-repeat",
        classname
      )}
    >
      <p className="type-title-medium py-2 pl-7 text-left text-white">
        {title}
      </p>
    </div>
  );
}
