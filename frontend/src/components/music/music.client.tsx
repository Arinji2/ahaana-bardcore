import { cn } from "@/lib/utils";
import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useMusic } from "../music-context.client";

export function MusicCardClient({
  itemID,
  musicID,
}: {
  itemID: string;
  musicID: string;
}) {
  const { currentID, setCurrentID } = useMusic();
  const isPlaying = currentID === itemID;

  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!isPlaying && !audio.paused) {
      audio.pause();
    }

    if (isPlaying && audio.paused) {
      audio.play();
    }
  }, [isPlaying]);

  return (
    <button
      aria-label="Play or pause music"
      disabled={isLoading}
      onClick={() => {
        if (isLoading || !audioRef.current) return;

        if (audioRef.current.paused) {
          setCurrentID(itemID); // triggers pause in others via useEffect
        } else {
          audioRef.current.pause();
          setCurrentID(null);
        }
      }}
      className="size-20 border-2 border-black rounded-full relative flex flex-col overflow-hidden items-center justify-center bg-primary-bright"
    >
      {/* Loading Spinner */}
      <Loader2
        className={cn(
          "transition-all ease-in-out duration-300 absolute size-10 animate-spin",
          {
            "-translate-y-20": !isLoading,
            "translate-y-0": isLoading,
          },
        )}
      />

      {/* Audio Element */}
      <audio
        ref={audioRef}
        onCanPlay={() => setIsLoading(false)}
        src={`${process.env.NEXT_PUBLIC_PROXY_URL}/proxy?fileID=${musicID}`}
      />

      {/* Play / Pause Icon */}
      <div
        className={cn(
          "absolute transition-all ease-in-out duration-300 top-0 left-0 w-full h-full flex items-center justify-center",
          {
            "translate-y-20": isLoading,
            "translate-y-0": !isLoading,
          },
        )}
      >
        {isPlaying ? (
          <Pause className="size-10" />
        ) : (
          <Play className="size-10" />
        )}
      </div>
    </button>
  );
}
