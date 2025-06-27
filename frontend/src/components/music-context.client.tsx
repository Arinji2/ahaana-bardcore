"use client";
import { MusicSchemaType } from "@/lib/data";
import { createContext, useContext, useRef, useState, useEffect } from "react";

interface MusicContextType {
  recordData: MusicSchemaType | null;
  setRecordData: (data: MusicSchemaType | null) => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  isLoading: boolean;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
}

const MusicContext = createContext<MusicContextType>({
  recordData: null,
  setRecordData: () => {},
  audioRef: { current: null },
  isLoading: false,
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  play: () => {},
  pause: () => {},
  toggle: () => {},
  seek: () => {},
});

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
  const [recordData, setRecordData] = useState<MusicSchemaType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Load new track when recordData changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !recordData) return;

    const loadTrack = async () => {
      setIsLoading(true);
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);

      audio.src = `${process.env.NEXT_PUBLIC_PROXY_URL}/proxy?fileID=${recordData.driveID}`;

      try {
        audio.load();
        await audio.play();
        setIsPlaying(true);
        window.umami.track("music-play", {
          song: recordData.title,
        });
      } catch (error) {
        console.error("Error playing audio:", error);
        setRecordData(null);
        window.umami.track("music-error", {
          song: recordData.title,
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTrack();
  }, [recordData]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleCanPlay = () => setIsLoading(false);
    const handleLoadStart = () => setIsLoading(true);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleDurationChange = () => setDuration(audio.duration);
    const handleEnded = () => {
      setRecordData(null);
      setIsPlaying(false);
      setCurrentTime(0);
      window.umami.track("music-finish", {
        song: recordData?.title,
      });
    };
    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setIsLoading(false);
      setIsPlaying(false);
      setRecordData(null);
    };

    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("durationchange", handleDurationChange);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);

    return () => {
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("durationchange", handleDurationChange);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
    };
  }, [recordData?.title]);

  const play = async () => {
    const audio = audioRef.current;
    if (!audio || !recordData) return;

    try {
      await audio.play();
      window.umami.track("music-play", {
        song: recordData.title,
      });
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const pause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    window.umami.track("music-pause", {
      song: recordData?.title,
    });
  };

  const toggle = () => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  };

  const seek = (time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    window.umami.track("music-seek", {
      song: recordData?.title,
      time: time,
    });
  };

  return (
    <MusicContext.Provider
      value={{
        recordData,
        setRecordData,
        audioRef,
        isLoading,
        isPlaying,
        currentTime,
        duration,
        play,
        pause,
        toggle,
        seek,
      }}
    >
      {children}
      {/* Global audio element */}
      <audio ref={audioRef} preload="none" />
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);
