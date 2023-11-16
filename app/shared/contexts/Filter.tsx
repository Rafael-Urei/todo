"use client";

import { createContext, useState } from "react";
import { FilterType } from "../types/FilterType";

interface FilterData {
  type: FilterType;
  date: Date | null;
  search: string;
  cleanFilter: boolean;
  setType: (value: FilterType) => void;
  setDate: (value: Date | null) => void;
  setSearch: (value: string) => void;
  setCleanFilter: (value: boolean) => void;
}

export const FilterContext = createContext({} as FilterData);

export default function FilterProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(FilterType.ALL);
  const [date, setDate] = useState<Date | null>(null);
  const [cleanFilter, setCleanFilter] = useState<boolean>(false);

  return (
    <FilterContext.Provider
      value={{
        type,
        setType,
        date,
        setDate,
        search,
        setSearch,
        cleanFilter,
        setCleanFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}
