import { Calendar, Disc3, UsersRound } from "lucide-react";
import { MusicCardClient } from "./music.client";
import { ClassValue } from "clsx";
import { cn } from "@/lib/utils";

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

type Variant = "sm" | "base" | "lg";

export function MusicCard({
  item,
  className,
  variant = "base",
}: {
  item: MusicCardProps;
  className?: ClassValue;
  variant?: Variant;
}) {
  const variantStyles = {
    sm: {
      wrapper: "gap-3 py-3 px-3 text-sm md:w-[350px]",
      heading: "text-xl",
      icon: "size-4",
      text: "text-base",
    },
    base: {
      wrapper: "gap-5 py-5 px-4 text-base md:w-[400px]",
      heading: "text-2xl",
      icon: "size-6",
      text: "text-lg",
    },
    lg: {
      wrapper: "gap-6 py-6 px-6 text-lg md:w-[600px]",
      heading: "text-3xl",
      icon: "size-7",
      text: "text-xl",
    },
  }[variant];

  return (
    <div
      className={cn(
        "w-full h-fit shadow-button border-[4px] border-primary bg-offwhite rounded-sm flex flex-col items-start justify-start",
        variantStyles.wrapper,
        className,
      )}
    >
      <h3 className={cn("font-medium text-primary", variantStyles.heading)}>
        {item.title}
      </h3>
      <div className="w-full h-full flex flex-col md:flex-row items-start gap-6 md:gap-0 md:items-center justify-between">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="w-full h-fit flex flex-row gap-2 items-center justify-start">
            <Disc3 className={cn("text-primary", variantStyles.icon)} />
            <p className={cn("font-medium text-primary", variantStyles.text)}>
              {durationFormatter(item.duration)}
            </p>
          </div>
          <div className="w-full h-fit flex flex-row gap-2 items-center justify-start">
            <UsersRound
              className={cn("text-primary shrink-0", variantStyles.icon)}
            />
            <p
              className={cn(
                "font-medium text-primary line-clamp-1",
                variantStyles.text,
              )}
            >
              {item.originalArtists
                ? item.originalArtists.join(", ")
                : "Ahaana Ravishankor"}
            </p>
          </div>
          <div className="w-full h-fit flex flex-row gap-2 items-center justify-start">
            <Calendar
              className={cn("text-primary shrink-0", variantStyles.icon)}
            />
            <p
              className={cn(
                "font-medium text-primary line-clamp-1",
                variantStyles.text,
              )}
            >
              {new Date(item.dateAdded).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="w-fit shrink-0 h-full flex flex-col items-center justify-center">
          <MusicCardClient
            variant={variant}
            itemID={item.id}
            musicID={item.driveID}
          />
        </div>
      </div>
    </div>
  );
}
