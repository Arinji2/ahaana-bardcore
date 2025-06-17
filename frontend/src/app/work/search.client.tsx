"use client";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
export default function Search({ search }: { search: string }) {
  const [inputSearch, setInputSearch] = useState(search ?? "");
  const [value] = useDebounce(inputSearch, 1000);

  const searchParams = useSearchParams();
  const params = useMemo(
    () => new URLSearchParams(searchParams),
    [searchParams],
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (value == "") {
      params.delete("search");
      router.push(`${pathname}?${params.toString()}`);
    } else {
      params.set("search", value);
      router.push(`${pathname}?${params.toString()}`);
    }
  }, [value, params, router, pathname]);

  return (
    <div className="flex h-fit w-full flex-row items-center justify-between gap-3 rounded-md bg-offwhite p-2 shadow-button border-[2px] border-primary">
      <input
        type="text"
        placeholder="Search By Song Title"
        value={inputSearch}
        onChange={(e) => {
          setInputSearch(e.target.value);
        }}
        className="h-fit w-full rounded-md bg-transparent px-3 py-1 text-lg font-medium placeholder:text-lg text-primary palceholder:text-black outline-none "
      />
      <Loader2
        className={cn(
          "size-6 animate-spin text-primary opacity-100 transition-all duration-300 ease-in-out",
          {
            "opacity-0": value === inputSearch,
          },
        )}
      />
    </div>
  );
}
