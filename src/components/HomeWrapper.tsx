import Image from "next/image";
import BackgroundWithNoise from "./BackgroundWithNoise";
import firstDateLogo from "../../public/logo/firstdate.svg";
import vishnuLogo from "../../public/logo/vishnu.svg";
import cloud1Logo from "../../public/decorating/clouds/cloud1.svg";
import cloud2Logo from "../../public/decorating/clouds/cloud2.svg";
import cn from "@/lib/helpers/cn";
import NavBar from "@/components/NavBar";

export default function HomeWrapper({
  children,
  classname,
}: {
  children: React.ReactNode;
  classname?: string;
}) {
  return (
    // Reuse component for home page and login page
    <BackgroundWithNoise
      className={cn("from-yellow to-yellow-white bg-gradient-to-b", classname)}
    >
      <div className="relative mx-auto flex h-full max-w-200 flex-col items-center text-center">
        <Image
          src={cloud1Logo}
          width={73.5}
          height={40}
          alt=""
          className="absolute top-95 -left-5 opacity-40"
        />
        <Image
          src={cloud2Logo}
          width={106}
          height={51}
          alt=""
          className="absolute top-47 -right-9 opacity-40"
        />
        <Image
          src={cloud2Logo}
          width={158}
          height={76}
          alt=""
          className="absolute top-111 -right-18 -scale-x-100 transform"
        />
        <div className="h-8 w-full bg-red-400">Header</div>
        <NavBar />
        <div className="relative mt-11 flex flex-col items-center">
          <Image
            src={firstDateLogo}
            priority
            alt="โลโก้ intania firstdate"
            className="-mb-10"
          />
          <Image src={vishnuLogo} priority alt="โลโก้ ค่ายวิษณุ" />
        </div>
        {children}
      </div>
    </BackgroundWithNoise>
  );
}
