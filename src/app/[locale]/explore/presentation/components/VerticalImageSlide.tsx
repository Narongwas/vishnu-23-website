import type { StyleableFC } from "@/lib/types/misc";
import Image from "next/image";

interface Props {
  imagePaths: string[];
}

const VerticalImageSlides: StyleableFC<Props> = ({
  imagePaths,
  className = "",
}) => {
  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      {imagePaths.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt={`Slide ${i + 1}`}
          width={768}
          height={432}
          className="h-auto w-full"
        />
      ))}
    </div>
  );
};

export default VerticalImageSlides;
