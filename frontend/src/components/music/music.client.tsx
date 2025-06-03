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
  const [isLoading, setIsLoading] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const loadAudio = () => {
    if (!audioLoaded && audioRef.current) {
      const audio = audioRef.current;
      audio.src = `${process.env.NEXT_PUBLIC_PROXY_URL}/proxy?fileID=${musicID}`;
      audio.load();
      setAudioLoaded(true);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioLoaded) return;

    if (!isPlaying && !audio.paused) {
      audio.pause();
    }

    if (isPlaying && audio.paused) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsLoading(false);
        setCurrentID(null);
      });
    }
  }, [isPlaying, audioLoaded, setCurrentID]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleError = (e: unknown) => {
      console.error("Audio error:", e);
      setIsLoading(false);
      setCurrentID(null);
      setAudioLoaded(false);
    };

    const handleEnded = () => {
      setCurrentID(null);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("error", handleError);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setCurrentID]);

  const handleClick = () => {
    if (!audioLoaded) {
      loadAudio();
      setCurrentID(itemID);
      return;
    }

    if (isLoading || !audioRef.current) return;

    if (audioRef.current.paused) {
      setCurrentID(itemID);
    } else {
      audioRef.current.pause();
      setCurrentID(null);
    }
  };

  return (
    <button
      aria-label="Play or pause music"
      disabled={isLoading}
      onClick={handleClick}
      className="size-20 border-2 border-black rounded-full relative flex flex-col overflow-hidden items-center justify-center bg-primary-bright"
    >
      <Loader2
        className={cn(
          "transition-all ease-in-out duration-300 absolute size-10 animate-spin",
          {
            "-translate-y-20": !isLoading,
            "translate-y-0": isLoading,
          },
        )}
      />

      <audio ref={audioRef} preload="none" />

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
