import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
export default function Hero() {
  return (
    <div className=" flex flex-col items-center justify-start gap-5 w-full h-[calc(100svh-40px)]">
      <h1 className="text-4xl text-center md:text-5xl lg:text-7xl font-bold text-primary">
        Ahaana Ravishankor
      </h1>
      <p className="text-2xl md:text-4xl text-secondary">
        A glimpse at my music journey and all of my work :D
      </p>
      <Link href="/work" prefetch={true}>
        <Button className="text-lg" size="lg">
          View My Songs!
        </Button>
      </Link>
      <div className="mt-auto w-full h-full relative">
        <Image
          className="object-cover md:object-contain 2xl:object-cover object-top"
          src="/hero.png"
          alt="Hero"
          fill
          priority
        />
      </div>
    </div>
  );
}
