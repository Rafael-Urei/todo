"use client";

import { Box, Stack, TextField, Typography } from "@mui/material";
import { useFilter } from "../../hooks/useFilter";
import { FilterType } from "../../types/FilterType";

export function FilterBySearch() {
  const { search, setSearch, setType, setDate } = useFilter();

  const handleFilterBySearch = (event: any) => {
    setSearch(event.target.value);
    setType(FilterType.ALL);
    setDate(null);
  };

  return (
    <Box width={"100%"}>
      <Typography marginBottom={1}>Search your task:</Typography>
      <Stack sx={{ width: 400 }}>
        <TextField
          variant="standard"
          value={search}
          onChange={(event) => handleFilterBySearch(event)}
        />
      </Stack>
    </Box>
  );
}
