"use client";

import { Calendar, Disc3, UsersRound } from "lucide-react";
import { MusicCardClient } from "./music.client";

export type MusicCardProps = {
  id: string;
  title: string;
  duration: number;
  originalArtists?: string[];
  driveID: string;
  featured: boolean;
  dateAdded: string;
};
function durationFormatter(duration: number) {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}m${seconds}s`;
}
export function MusicCard({ item }: { item: MusicCardProps }) {
  return (
    <div className="w-full gap-5 py-5 md:w-[450px] h-fit px-4 shadow-button border-[4px] border-primary bg-offwhite rounded-sm flex flex-col items-start  justify-start">
      <h3 className="text-2xl font-medium text-primary">{item.title}</h3>
      <div className="w-full h-full flex flex-row items-center justify-between">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full h-fit flex flex-row gap-2 items-center  justify-start">
            <Disc3 className="text-primary size-6" />
            <p className="text-lg font-medium text-primary">
              {durationFormatter(item.duration)}
            </p>
          </div>
          <div className="w-full h-fit flex flex-row gap-2 items-center  justify-start">
            <UsersRound className="text-primary size-6 shrink-0" />
            <p className="text-lg font-medium text-primary line-clamp-1">
              {item.originalArtists
                ? item.originalArtists.join(", ")
                : "Ahaana Ravishankor"}
            </p>
          </div>

          <div className="w-full h-fit flex flex-row gap-2 items-center  justify-start">
            <Calendar className="text-primary size-6 shrink-0" />
            <p className="text-lg font-medium text-primary line-clamp-1">
              {new Date(item.dateAdded).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="w-fit shrink-0 h-full flex flex-col items-center justify-center">
          <MusicCardClient itemID={item.id} musicID={item.driveID} />
        </div>
      </div>
    </div>
  );
}
