"use client";
import { cn } from "@/lib/utils";
import { useMusic } from "../music-context.client";
import { MusicCardClient } from "../music/music.client";
import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";

// Helper function to format time in MM:SS
const formatTime = (timeInSeconds: number): string => {
  if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "0:00";

  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export function MusicPlayer() {
  const { recordData, pause, setRecordData, currentTime, duration, seek } =
    useMusic();
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(0);
  const [recentSeekTime, setRecentSeekTime] = useState<number | null>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  // Calculate position from mouse/touch event
  const getPositionFromEvent = (
    e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent,
  ): number => {
    if (!progressRef.current) return 0;

    const rect = progressRef.current.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0]?.clientX || 0 : e.clientX;
    const clickX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));

    return percentage;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!duration) return;
    e.preventDefault();
    setIsDragging(true);
    const position = getPositionFromEvent(e);
    setDragPosition(position);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!duration) return;
    e.preventDefault();
    setIsDragging(true);
    const position = getPositionFromEvent(e);
    setDragPosition(position);
  };

  // Handle mouse/touch move and release
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const position = getPositionFromEvent(e);
      setDragPosition(position);
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const position = getPositionFromEvent(e);
      setDragPosition(position);
    };

    const handleMouseUp = () => {
      if (duration) {
        const newTime = (dragPosition / 100) * duration;
        seek(newTime);
        setRecentSeekTime(newTime);
      }
      setIsDragging(false);
    };

    const handleTouchEnd = () => {
      if (duration) {
        const newTime = (dragPosition / 100) * duration;
        seek(newTime);
        setRecentSeekTime(newTime);
      }
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging, dragPosition, duration, seek]);

  // Clear recentSeekTime once the player catches up
  useEffect(() => {
    if (recentSeekTime !== null) {
      const diff = Math.abs(currentTime - recentSeekTime);
      if (diff < 0.3) {
        setRecentSeekTime(null);
      }
    }
  }, [currentTime, recentSeekTime]);

  const effectiveTime =
    recentSeekTime ??
    (isDragging ? (dragPosition / 100) * duration : currentTime);
  const displayPercentage = (duration > 0 ? effectiveTime / duration : 0) * 100;
  const displayTime = effectiveTime;

  return (
    <div
      className={cn(
        "transition-all ease-in-out py-2 duration-300 will-change-transform w-full fixed bottom-0 left-0 z-50 h-[120px] md:h-[130px] bg-primary flex flex-col items-center justify-center translate-y-full",
        {
          "translate-y-0": recordData,
        },
      )}
    >
      <div className="w-full h-full flex flex-col max-w-pageMax px-4">
        <div className="space-y-1 w-full ">
          <div
            ref={progressRef}
            className={cn(
              "relative w-full h-2 bg-gray-600 rounded-full overflow-hidden cursor-pointer group",
            )}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div
              className={cn("h-full bg-white transition-all ease-out", {
                "duration-100": !isDragging,
                "duration-0": isDragging,
              })}
              style={{ width: `${displayPercentage}%` }}
            />
          </div>

          <div className="flex flex-row items-center justify-between w-full gap-2 text-base text-offwhite">
            <span>{formatTime(displayTime)}</span>
            <span>{formatTime(recordData?.duration ?? 0)}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-row items-center mt-auto justify-between h-fit">
          <div className="flex flex-col items-start justify-start h-fit w-[70%] md:w-[60%]">
            <p className="text-lg md:text-xl text-white line-clamp-1 w-full text-left font-bold ">
              {recordData?.title}
            </p>
            <p className="text-base md:text-lg text-offwhite font-medium ">
              {recordData?.isOriginal
                ? "Ahaana Ravishankor"
                : recordData?.artists.join(", ")}
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-row items-center justify-center h-full gap-4 ">
            <MusicCardClient data={recordData!} variant="sm" />
            <Button
              variant="destructive"
              onClick={() => {
                pause();
                setRecordData(null);
              }}
              className="text-white aspect-square rounded-full border-2 border-black  hover:text-offwhite transition-colors p-2"
              aria-label="Close player"
            >
              <X className="text-black size-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
