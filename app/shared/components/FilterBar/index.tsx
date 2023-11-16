"use client";

import { Box, Button } from "@mui/material";
import { FilterByType } from "../FilterByType";
import { FilterBySearch } from "../FilterBySearch";
import { CalendarComponent } from "../DatePicker";
import { useFilter } from "../../hooks/useFilter";
import { FilterType } from "../../types/FilterType";

export function FilterBar() {
  const { setDate, setType, setSearch } = useFilter();

  const handleCleanFilters = () => {
    setDate(null);
    setType(FilterType.ALL);
    setSearch("");
  };

  return (
    <Box
      display={"flex"}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      marginBottom={2}
      gap={5}
    >
      <FilterBySearch />
      <CalendarComponent />
      <FilterByType />
      <Button sx={{ marginTop: 4 }} onClick={handleCleanFilters}>
        Limpar
      </Button>
    </Box>
  );
}
