import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div className=" flex flex-col items-center justify-start gap-5 w-full h-[calc(100svh-40px)]">
      <h1 className="text-4xl text-center md:text-5xl lg:text-7xl font-bold text-primary">
        Cool Name Here :D
      </h1>
      <p className="text-2xl md:text-4xl text-secondary">
        A look into my music journey
      </p>
      <Button className="text-lg" size="lg">
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
