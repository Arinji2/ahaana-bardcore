"use client";

import { MusicCard } from "@/components/music/music";
import { MusicSchemaType } from "@/lib/data";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export function MusicItems({ items }: { items: MusicSchemaType[] }) {
  const [parent] = useAutoAnimate();
  return (
    <div
      ref={parent}
      className="w-full h-fit grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8"
    >
      {items.map((record) => (
        <MusicCard item={record} key={record.id} />
      ))}
    </div>
  );
}
