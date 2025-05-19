"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaTimes, FaFilter, FaSearch } from "react-icons/fa";

export default function Sidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState<string[]>([]);
  const [sort, setSort] = useState<string>("");
  const [area, setArea] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setGender(params.getAll("gender"));
    setSort(params.get("sort") || "");
    setArea(params.get("area") || "");
  }, [searchParams]);

  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  const [searchText, setSearchText] = useState(
    searchParams.get("search") || ""
  );

  useEffect(() => {
    fetch("/api/areas")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.areas)) {
          setAvailableAreas(data.areas);
        }
      });
  }, []);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (key === "gender") {
      const genders = params.getAll("gender");
      if (genders.includes(value)) {
        params.delete("gender");
        genders
          .filter((g) => g !== value)
          .forEach((g) => params.append("gender", g));
      } else {
        params.append("gender", value);
      }
    } else {
      params.set(key, value);
    }

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const [isPending, startTransition] = useTransition();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(() => {
      updateFilters("search", searchText);
    });
  };

  const clearSearch = () => {
    setSearchText("");
    startTransition(() => {
      updateFilters("search", "");
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-blue-600 text-white px-3 py-2 rounded shadow"
      >
        <FaFilter className="inline mr-2" /> Filters
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 lg:translate-x-0 lg:w-1/4 lg:min-w-80 lg:block lg:sticky lg:top-0 `}
      >
        <div className="flex justify-end p-4 lg:hidden">
          <button onClick={() => setIsOpen(false)}>
            <FaTimes className="h-6 w-6 text-blue-600 hover:text-blue-800" />
          </button>
        </div>

        <div className="p-4 space-y-6">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Filters</h2>

          <form onSubmit={handleSearchSubmit} className="mb-4">
            <h3 className="text-blue-600 font-semibold mb-2">Search</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search PG name, area, location..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="flex-1 border border-blue-400 focus:ring-blue-500 rounded p-2"
              />

              {searchText && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-500 hover:text-red-600"
                  title="Clear"
                >
                  <FaTimes />
                </button>
              )}

              <button
                type="submit"
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
                title="Search"
                disabled={isPending}
              >
                {isPending ? (
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin block" />
                ) : (
                  <FaSearch />
                )}
              </button>
            </div>
          </form>

          <div>
            <h3 className="text-blue-600 font-semibold mb-2">Gender</h3>
            {["Boys", "Girls"].map((g) => (
              <div key={g} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={`gender-${g}`}
                  checked={gender.includes(g)}
                  onChange={() =>
                    startTransition(() => updateFilters("gender", g))
                  }
                  className="mr-2 accent-blue-600"
                />
                <label className="cursor-pointer" htmlFor={`gender-${g}`}>{g}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-blue-600 font-semibold mb-2">Price Sort</h3>
            {[
              { label: "Low to High", value: "asc" },
              { label: "High to Low", value: "desc" },
            ].map((option) => (
              <div key={option.value} className="flex items-center mb-1">
                <input
                  type="radio"
                  id={`sort-${option.value}`}
                  name="sort"
                  checked={sort === option.value}
                  onChange={() =>
                    startTransition(() => updateFilters("sort", option.value))
                  }
                  className="mr-2 accent-blue-600"
                />
                <label className="cursor-pointer" htmlFor={`sort-${option.value}`}>{option.label}</label>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-blue-600 font-semibold mb-2">Area</h3>
            <select
              value={area}
              onChange={(e) =>
                startTransition(() => updateFilters("area", e.target.value))
              }
              className="cursor-pointer w-full border border-blue-400 focus:ring-blue-500 rounded p-2"
            >
              <option value="">All Areas</option>
              {availableAreas.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
      </aside>
    </>
  );
}
