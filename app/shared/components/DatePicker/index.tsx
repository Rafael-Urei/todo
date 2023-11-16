"use client";

import { Badge, Box, Typography } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formatISO } from "date-fns";
import { useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { useFilter } from "../../hooks/useFilter";
import { FilterType } from "../../types/FilterType";

function ServerDay(
  props: PickersDayProps<Date> & { highlightedDays?: string[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const date = formatISO(props.day);

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.indexOf(date) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? <Badge variant="dot" color="secondary" /> : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export function CalendarComponent() {
  const { tasks } = useTasks();

  const { setDate, setType, date } = useFilter();

  const datesFromTasks = tasks.map((task) => {
    return task.date;
  });

  const [highlightedDays, setHighlightedDays] = useState(datesFromTasks);

  const handleChangeDate = (value: Date | null) => {
    value && setDate(value);
    setType(FilterType.ALL);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box>
        <Typography marginBottom={1}>Filter by date:</Typography>
        <DatePicker
          sx={{ width: 200 }}
          value={date}
          onChange={(value: Date | null) => handleChangeDate(value)}
          slots={{ day: ServerDay }}
          slotProps={{ day: { highlightedDays } as any }}
        />
      </Box>
    </LocalizationProvider>
  );
}
