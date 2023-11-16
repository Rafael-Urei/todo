"use client";

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { FilterType } from "../../types/FilterType";
import { useFilter } from "../../hooks/useFilter";

export function FilterByType() {
  const { type, setType, setDate } = useFilter();

  const handleSetFilter = (event: SelectChangeEvent) => {
    setType(event.target.value as any);
    setDate(null);
  };

  return (
    <Box>
      <Typography marginBottom={1}>Filter by type:</Typography>
      <FormControl sx={{ width: 200 }}>
        <Select value={type.toString()} onChange={handleSetFilter}>
          <MenuItem value={FilterType.ALL}>All</MenuItem>
          <MenuItem value={FilterType.STUDY}>Study</MenuItem>
          <MenuItem value={FilterType.TRIP}>Trip</MenuItem>
          <MenuItem value={FilterType.PERSONAL}>Personal</MenuItem>
          <MenuItem value={FilterType.WORK}>Work</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
