"use client";
import { cn } from "@/lib/utils";
import { Loader2, Pause, Play } from "lucide-react";
import { useMusic } from "../music-context.client";
import { MusicSchemaType } from "@/lib/data";

export function MusicCardClient({
  data,
  variant = "base",
}: {
  data: MusicSchemaType;
  variant?: "sm" | "base" | "lg";
}) {
  const { recordData, setRecordData, isLoading, isPlaying, toggle } =
    useMusic();

  const isCurrentTrack = recordData && recordData.id === data.id;

  const handleClick = () => {
    if (isCurrentTrack) {
      toggle();
    } else {
      setRecordData(data);
    }
  };

  const sizeClasses = {
    sm: {
      button: "size-14",
      icon: "size-8",
      spinner: "size-8",
    },
    base: {
      button: "size-20",
      icon: "size-10",
      spinner: "size-10",
    },
    lg: {
      button: "size-28",
      icon: "size-12",
      spinner: "size-12",
    },
  }[variant];

  return (
    <button
      aria-label="Play or pause music"
      disabled={(isLoading && isCurrentTrack) ?? false}
      onClick={handleClick}
      className={cn(
        "border-2 border-black rounded-full relative flex flex-col overflow-hidden items-center justify-center bg-primary-bright",
        sizeClasses.button,
      )}
    >
      <Loader2
        className={cn(
          "transition-all ease-in-out duration-300 absolute animate-spin",
          sizeClasses.spinner,
          {
            "-translate-y-20": !(isLoading && isCurrentTrack),
            "translate-y-0": isLoading && isCurrentTrack,
          },
        )}
      />

      <div
        className={cn(
          "absolute transition-all ease-in-out duration-300 top-0 left-0 w-full h-full flex items-center justify-center",
          {
            "translate-y-20": isLoading && isCurrentTrack,
            "translate-y-0": !(isLoading && isCurrentTrack),
          },
        )}
      >
        {isCurrentTrack && isPlaying ? (
          <Pause className={sizeClasses.icon} />
        ) : (
          <Play className={sizeClasses.icon} />
        )}
      </div>
    </button>
  );
}
