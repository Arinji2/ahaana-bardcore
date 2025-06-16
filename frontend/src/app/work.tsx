import { MusicCard } from "@/components/music/music";
import { Button } from "@/components/ui/button";
import { MusicSchema, MusicSchemaType } from "@/lib/data";
import { getPB } from "@/lib/pb";
import { memoize } from "nextjs-better-unstable-cache";

export default async function Work() {
  const pinnedReleases = await memoize(async () => {
    const pb = await getPB();
    const featuredReleases = await pb
      .collection("music")
      .getList<MusicSchemaType>(1, 3, {
        filter: "pinned=true",
      });

    const parsedFeaturedReleases = featuredReleases.items
      .map((release) => {
        const parse = MusicSchema.safeParse(release);
        if (parse.success) {
          return parse.data;
        }
        return null;
      })
      .filter((release) => release !== null) as MusicSchemaType[];

    return parsedFeaturedReleases;
  })();
  return (
    <div className="w-full gap-6 md:gap-10 relative flex flex-col items-center px-4 justify-center">
      <h2 className="text-4xl font-bold tracking-wider text-primary">
        ALL OF MY WORK
      </h2>
      <div className="flex flex-col gap-12 justify-stretch items-center w-full ">
        <div className="w-fit h-fit flex md:flex-row flex-col items-center justify-center gap-8">
          {pinnedReleases.map((release) => (
            <MusicCard variant="sm" item={release} key={release.id} />
          ))}
        </div>
        <Button className="text-lg" size={"lg"}>
          View All
        </Button>
      </div>
    </div>
  );
}
