import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Credits() {
  return (
    <div className=" flex flex-col pt-20 items-center justify-start w-full h-fit md:h-[calc(100svh-40px)]">
      <div className="w-full md:w-[70%] h-fit shrink-0 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-5">
        <div className="w-full md:w-[30%] md:h-[250px] flex flex-col items-center md:items-start justify-start gap-5 ">
          <p className="text-2xl font-medium text-center tracking-wider">
            Website designed and built by Arinji
          </p>
          <Button className="text-lg" size={"lg"}>
            Check Out My Portfolio
          </Button>
        </div>
        <div className="w-full md:w-[30%] md:h-[250px] flex flex-col items-center justify-between gap-5 md:gap-10 ">
          <h2 className="text-6xl font-bold text-primary">CREDITS</h2>

          <div className="w-full h-fit flex flex-col items-center justify-start gap-5 ">
            <p className="text-2xl font-medium tracking-wider">
              Assets from Bayeux
            </p>
            <Button className="text-lg" size={"lg"}>
              Check Out His Assets
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:block hidden h-full mt-auto relative">
        <Image
          fill
          className="object-contain object-top"
          src="/credit.png"
          alt="Credits"
        />
      </div>
    </div>
  );
}
