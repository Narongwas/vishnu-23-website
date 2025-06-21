import cn from "@/lib/utils";

export default function FlagTitle({
  title,
  classname,
}: {
  title: string;
  classname?: string;
}) {
  return (
    <div
      className={cn(
        "mb-4 bg-[url('/decorating/shapes/flag.svg')] bg-no-repeat h-10",
        classname
      )}
    >
      <p className="type-title-medium text-left pl-7 py-2 text-white">
        {title}
      </p>
    </div>
  );
}
