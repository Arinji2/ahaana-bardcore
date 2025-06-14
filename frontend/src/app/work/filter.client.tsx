"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";

// ————— SORTER COMPONENT (0 → none, 1 → asc, 2 → desc)
function Sorter({
  isLoading,
  startLoading,
  sortKey,
  label,
  width,
}: {
  isLoading: boolean;
  startLoading: React.TransitionStartFunction;
  sortKey: string;
  label: string;
  width: number;
}) {
  const [sort, setSort] = useState<0 | 1 | 2>(0);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const sortValue = useMemo(
    () => parseInt(searchParams.get(sortKey) ?? "0"),
    [searchParams, sortKey],
  );

  useEffect(() => {
    setSort([0, 1, 2].includes(sortValue) ? (sortValue as 0 | 1 | 2) : 0);
  }, [sortValue]);

  const updateSort = useCallback(
    (newSort: 0 | 1 | 2) => {
      const params = new URLSearchParams(searchParams);
      if (newSort === 0) {
        params.delete(sortKey);
      } else {
        params.set(sortKey, String(newSort));
      }
      startLoading(() => router.replace(`${pathname}?${params.toString()}`));
    },
    [searchParams, sortKey, startLoading, router, pathname],
  );

  useEffect(() => {
    updateSort(sort);
  }, [sort, updateSort]);

  return (
    <Button
      disabled={isLoading}
      onClick={() => setSort(sort === 0 ? 1 : sort === 1 ? 2 : 0)}
      style={{ "--tw-xl-width": `${width}px` } as React.CSSProperties}
      className={cn(
        "relative flex h-[40px] w-full flex-row items-center justify-center gap-2 bg-primary px-5 py-1 text-lg font-medium text-white enabled:hover:scale-100 xl:h-auto xl:[width:var(--tw-xl-width)]",
        {
          "bg-secondary/80": sort === 0,
        },
      )}
    >
      <p
        className={cn(
          "absolute top-1/2 will-change-transform -translate-y-1/2 whitespace-nowrap transition-all duration-300 ease-in-out",
          sort !== 0 ? "left-3" : "left-1/2 -translate-x-1/2",
        )}
      >
        {label}
      </p>

      <ChevronDown
        className={cn(
          "pointer-events-none will-change-transform absolute right-3 size-6 text-white opacity-0 transition-all duration-200 ease-in-out",
          {
            "opacity-100": sort !== 0,
            "rotate-180": sort === 2,
          },
        )}
      />
    </Button>
  );
}

// ————— FILTER TOGGLE COMPONENT (true/false only)
function FilterToggle({
  isLoading,
  startLoading,
  filterKey,
  label,
  width,
}: {
  isLoading: boolean;
  startLoading: React.TransitionStartFunction;
  filterKey: string;
  label: string;
  width: number;
}) {
  const [enabled, setEnabled] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setEnabled(searchParams.get(filterKey) === "1");
  }, [searchParams, filterKey]);

  const toggleFilter = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    if (enabled) {
      params.delete(filterKey);
    } else {
      params.set(filterKey, "1");
    }
    startLoading(() => router.replace(`${pathname}?${params.toString()}`));
  }, [enabled, filterKey, searchParams, router, pathname, startLoading]);

  return (
    <Button
      disabled={isLoading}
      onClick={toggleFilter}
      style={{ "--tw-xl-width": `${width}px` } as React.CSSProperties}
      className={cn(
        "relative flex h-[40px] w-full scale-100 flex-row items-center justify-center gap-2 bg-primary px-5 py-1 text-lg font-medium text-white enabled:hover:scale-100 xl:h-auto xl:[width:var(--tw-xl-width)]",
        {
          "bg-secondary/80": !enabled,
        },
      )}
    >
      <p
        className={cn(
          "absolute top-1/2 will-change-transform -translate-y-1/2 whitespace-nowrap transition-all duration-300 ease-in-out",
          enabled ? "left-3" : "left-1/2 -translate-x-1/2",
        )}
      >
        {label}
      </p>
    </Button>
  );
}

export default function SortersContainer() {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="shrink-0 flex h-fit w-full flex-col items-stretch justify-center gap-2 xl:h-auto xl:w-fit xl:flex-row">
      <Sorter
        isLoading={isPending}
        startLoading={startTransition}
        sortKey="duration"
        label="Duration"
        width={150}
      />
      <Sorter
        isLoading={isPending}
        startLoading={startTransition}
        sortKey="attempted"
        label="Created On"
        width={175}
      />
      <FilterToggle
        isLoading={isPending}
        startLoading={startTransition}
        filterKey="original"
        label="Original Only"
        width={180}
      />
    </div>
  );
}
