import Image from "next/image";
import BackgroundWithNoise from "./BackgroundWithNoise";
import firstDateLogo from "../../public/logo/firstdate.svg";
import vishnuLogo from "../../public/logo/vishnu.svg";
import cloud1Logo from "../../public/decorating/clouds/cloud1.svg";
import cloud2Logo from "../../public/decorating/clouds/cloud2.svg";
import cn from "@/lib/utils";
import NavBar from "./NavBar";

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
      classname={cn("bg-gradient-to-b from-yellow to-yellow-white", classname)}
    >
      <div className="relative h-full flex flex-col items-center max-w-200 text-center mx-auto">
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
          className="absolute top-111 -right-18 transform -scale-x-100"
        />
        <div className="w-full h-8 bg-red-400">Header</div>
        <NavBar/>
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
