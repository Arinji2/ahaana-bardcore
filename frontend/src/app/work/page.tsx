import { MusicCard } from "@/components/music/music";
import Search from "./search.client";
import FiltersContainer from "./filter.client";
import { Suspense } from "react";

export default async function Page() {
  return (
    <div className=" px-4 gap-20 flex flex-col items-center justify-start py-10">
      <div className=" flex flex-col items-center justify-start gap-5 w-full min-h-[calc(100svh-40px)]">
        <h1 className="text-4xl text-center md:text-5xl lg:text-7xl font-bold text-primary">
          My Work!
        </h1>

        <div className="flex h-fit w-full flex-col items-stretch justify-center gap-4 xl:flex-row">
          <Suspense fallback={<div>Loading...</div>}>
            <Search />
            <FiltersContainer />
          </Suspense>
        </div>

        <div className="w-full h-fit grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
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

          <MusicCard
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
      </div>
    </div>
  );
}
