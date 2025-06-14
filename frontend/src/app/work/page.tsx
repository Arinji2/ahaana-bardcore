import { MusicCard } from "@/components/music/music";
import Search from "./search.client";
import FiltersContainer from "./filter.client";
import { Suspense } from "react";
import { memoize } from "nextjs-better-unstable-cache";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page: string | string[] | undefined;
    duration: string | string[] | undefined;
    createdOn: string | string[] | undefined;
    original: string | string[] | undefined;
    search: string | string[] | undefined;
  }>;
}) {
  let pageNumber = 1;
  let durationSort = 0;
  let createdSort = 0;
  let originalFilter = 0;
  let filterString = "";

  const { page, original, createdOn, duration, search } = await searchParams;
  if (search && !Array.isArray(search)) {
    filterString = ` && real_word.word ~ "${search}"`;
  }

  if (duration && !Array.isArray(duration)) {
    durationSort = parseInt(duration);
    if (isNaN(durationSort)) {
      durationSort = 0;
    }
  }

  if (createdOn && !Array.isArray(createdOn)) {
    createdSort = parseInt(createdOn);
    if (isNaN(createdSort)) {
      createdSort = 0;
    }
  }

  if (original && !Array.isArray(original)) {
    originalFilter = parseInt(original);
    if (isNaN(originalFilter)) {
      originalFilter = 0;
    }
  }

  if (page && !Array.isArray(page)) {
    pageNumber = parseInt(page);
    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
  }
  const getSortString = (
    durationSort: number,
    createdSort: number,
    originalFilter: number,
  ) => {
    const sortCriteria = [];

    if (durationSort !== 0) {
      sortCriteria.push(`${durationSort === 1 ? "-" : ""}duration`);
    }

    if (createdSort !== 0) {
      sortCriteria.push(`${createdSort === 1 ? "-" : ""}created`);
    }

    if (originalFilter !== 0) {
      sortCriteria.push(`${originalFilter === 1 ? "-" : ""}original`);
    }

    return sortCriteria.join(",") || "-created";
  };

  //const sortString = getSortString(durationSort, createdSort, originalFilter);

  //const wordsRecord = await memoize(
  //  async (
  //    locPageNumber: number,
  //    locUserID: string,
  //    locFilterString: string,
  //    locSortString: string,
  //  ) => {
  //    return await pb.collection("rounds").getList(locPageNumber, 10, {
  //      filter: `game.user = "${locUserID}" && is_fake = false && real_word != ""${locFilterString}`,
  //      expand: "real_word,game",
  //      sort: locSortString.length > 2 ? locSortString : "-created",
  //    });
  //  },
  //)(pageNumber, , filterString, sortString);

  //const parsedWords = wordsRecord.items
  //  .map((word) => {
  //    const parse = MusicSchema.safeParse(word);
  //    if (parse.success) {
  //      return parse.data;
  //    }
  //    return null;
  //  })
  //  .filter((word) => word !== null);
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
