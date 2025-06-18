import { MusicSchema, MusicSchemaType } from "@/lib/data";
import { getPB } from "@/lib/pb";
import { memoize } from "nextjs-better-unstable-cache";
import { Suspense } from "react";
import FiltersContainer from "./filter.client";
import { MusicItems } from "./items.client";
import Search from "./search.client";
import Pagination from "./pagination.client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work",
  description:
    "This is all of my music. I love making covers and adding my own flair to these classics. You can check out and listen to all of my songs directly from this page :D",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    page: string | string[] | undefined;
    duration: string | string[] | undefined;
    releasedOn: string | string[] | undefined;
    original: string | string[] | undefined;
    search: string | string[] | undefined;
  }>;
}) {
  let pageNumber = 1;
  let durationSort = 0;
  let createdSort = 0;

  const { page, original, releasedOn, duration, search } = await searchParams;
  const filterConditions: string[] = [];

  if (search && !Array.isArray(search)) {
    filterConditions.push(`title ~ "${search}"`);
  }

  if (original && !Array.isArray(original)) {
    const origValue = parseInt(original);
    if (!isNaN(origValue) && origValue === 1) {
      filterConditions.push(`artists = ""`);
    }
  }

  const filterString = filterConditions.join(" && ");

  if (duration && !Array.isArray(duration)) {
    durationSort = parseInt(duration);
    if (isNaN(durationSort)) {
      durationSort = 0;
    }
  }

  if (releasedOn && !Array.isArray(releasedOn)) {
    createdSort = parseInt(releasedOn);
    if (isNaN(createdSort)) {
      createdSort = 0;
    }
  }

  if (page && !Array.isArray(page)) {
    pageNumber = parseInt(page);
    if (isNaN(pageNumber)) {
      pageNumber = 1;
    }
  }

  const getSortString = (durationSort: number, createdSort: number) => {
    const sortCriteria = [];

    if (durationSort !== 0) {
      sortCriteria.push(`${durationSort === 1 ? "-" : ""}duration`);
    }

    if (createdSort !== 0) {
      sortCriteria.push(`${createdSort === 1 ? "-" : ""}releasedOn`);
    }
    return sortCriteria.join(",") || "-releasedOn";
  };

  const sortString = getSortString(durationSort, createdSort);
  const musicRecords = await memoize(
    async (
      locPageNumber: number,
      locFilterString: string,
      locSortString: string,
    ) => {
      const pb = await getPB();
      return await pb
        .collection("music")
        .getList<MusicSchemaType>(locPageNumber, 10, {
          filter: `${locFilterString}`,
          sort: locSortString.length > 2 ? locSortString : "-pinned",
        });
    },
    {
      log: ["datacache"],
    },
  )(pageNumber, filterString, sortString);

  const parsedRecords = musicRecords.items
    .map((record) => {
      const parse = MusicSchema.safeParse(record);
      if (parse.success) {
        return parse.data;
      }
      return null;
    })
    .filter((record) => record !== null);

  return (
    <div className=" px-4 gap-20 flex flex-col items-center justify-start py-10">
      <div className=" flex flex-col items-center justify-start gap-5 w-full min-h-[calc(100svh-40px)]">
        <h1 className="text-4xl text-center md:text-5xl lg:text-7xl font-bold text-primary">
          My Work!
        </h1>

        <div className="flex h-fit w-full flex-col items-stretch justify-center gap-4 xl:flex-row">
          <Suspense fallback={<div>Loading...</div>}>
            <Search search={search as string} />
            <FiltersContainer />
          </Suspense>
        </div>

        <MusicItems items={parsedRecords} />
        <Pagination
          pageNumber={pageNumber}
          totalPages={musicRecords.totalPages}
        />
        <Button variant="link" className="mt-4">
          <Link href="/" className="text-2xl font-medium">
            Go back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
