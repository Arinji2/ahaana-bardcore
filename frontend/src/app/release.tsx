import { MusicCard } from "@/components/music/music";
import Image from "next/image";
export default function FeaturedRelease() {
  return (
    <div className="w-fit  gap-10 relative flex flex-col items-end px-4 justify-center">
      <h2 className="text-4xl font-bold tracking-wider text-primary">
        FEATURED RELEASE
      </h2>
      <div className="flex flex-row gap-20 justify-stretch items-center w-full md:h-[400px] mt-auto">
        <div className="md:block aspect-video hidden w-[50%] shrink-0 overflow-hidden h-full relative ">
          <Image
            src="/feat-release.png"
            fill
            alt="Featured Release"
            className="object-cover object-bottom"
          />
        </div>

        <div className="w-full h-full flex flex-col items-end justify-center">
          <MusicCard
            item={{
              title: "A cool song name here which is very cool",
              id: "1234567890",
              duration: 120,
              originalArtists: ["Billy, Bobbie, Omkar :D"],
              driveID: "1Pb6GA-BsOkIz39aBP4mALTFYoJRGJj4V",
              featured: true,
              dateAdded: new Date().toISOString(),
            }}
          />
        </div>
      </div>
    </div>
  );
}
