import { MusicCard } from "@/components/music/music";
import { MusicSchema, MusicSchemaType } from "@/lib/data";
import { getPB } from "@/lib/pb";
import Image from "next/image";
import { memoize } from "nextjs-better-unstable-cache";

export default async function FeaturedRelease() {
  const featuredReleases = await memoize(async () => {
    const pb = await getPB();
    const featuredReleases = await pb
      .collection("music")
      .getList<MusicSchemaType>(1, 1, {
        filter: "featured=true",
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
          {featuredReleases.map((release) => (
            <MusicCard item={release} key={release.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
