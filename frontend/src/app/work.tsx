import { MusicCard } from "@/components/music/music";
import { Button } from "@/components/ui/button";

export default function Work() {
  return (
    <div className="w-full gap-6 md:gap-10 relative flex flex-col items-center px-4 justify-center">
      <h2 className="text-4xl font-bold tracking-wider text-primary">
        ALL OF MY WORK
      </h2>
      <div className="flex flex-col gap-12 justify-stretch items-center w-full ">
        <div className="w-fit h-fit flex md:flex-row flex-col items-center justify-center gap-8">
          <MusicCard
            variant="sm"
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

          <MusicCard
            variant="sm"
            item={{
              title: "A cool song name here which is very cool",
              id: "234567890",
              duration: 120,
              originalArtists: ["Billy, Bobbie, Omkar :D"],
              driveID: "1Pb6GA-BsOkIz39aBP4mALTFYoJRGJj4V",
              featured: true,
              dateAdded: new Date().toISOString(),
            }}
          />

          <MusicCard
            variant="sm"
            item={{
              title: "A cool song name here which is very cool",
              id: "234567890",
              duration: 120,
              originalArtists: ["Billy, Bobbie, Omkar :D"],
              driveID: "1Pb6GA-BsOkIz39aBP4mALTFYoJRGJj4V",
              featured: true,
              dateAdded: new Date().toISOString(),
            }}
          />
        </div>
        <Button className="text-lg" size={"lg"}>
          View All
        </Button>
      </div>
    </div>
  );
}
