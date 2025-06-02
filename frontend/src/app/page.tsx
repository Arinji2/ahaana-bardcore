import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" flex pt-10 flex-col items-center justify-start gap-5 w-full h-[100svh]">
      <h1 className="text-4xl text-center md:text-5xl lg:text-7xl font-bold text-primary">
        Cool Name Here :D
      </h1>
      <p className="text-2xl md:text-4xl text-secondary">
        A look into my music journey
      </p>
      <Button className="tracking-normal" size="lg">
        View My Songs!
      </Button>
      <div className="mt-auto w-full h-full relative">
        <Image
          className="object-cover md:object-contain 2xl:object-cover object-top"
          src="/hero.png"
          alt="Hero"
          fill
        />
      </div>
    </div>
  );
}
