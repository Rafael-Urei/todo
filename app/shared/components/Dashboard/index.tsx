"use client";

import { Divider, Grid, Typography } from "@mui/material";
import { GridItem } from "../GridItem";
import { LineChart, PieChart } from "@mui/x-charts";
import { useTasks } from "../../hooks/useTasks";
import { FilterType } from "../../types/FilterType";
import { useFilter } from "../../hooks/useFilter";
import { FilterByType } from "../FilterByType";
import { filterTasks } from "../../utils/filterTasks";

export function Dashboard() {
  const { tasks } = useTasks();
  const data = [
    {
      id: 1,
      value: filterTasks(tasks, "STUDY"),
      label: "Study Tasks",
      color: "#042940",
    },
    {
      id: 2,
      value: filterTasks(tasks, "WORK"),
      label: "Work Tasks",
      color: "#005C53",
    },
    {
      id: 3,
      value: filterTasks(tasks, "PERSONAL"),
      label: "Personal Tasks",
      color: "#9FC131",
    },
    {
      id: 4,
      value: filterTasks(tasks, "TRIP"),
      label: "Trip Tasks",
      color: "#DBF227",
    },
  ];

  return (
    <>
      <Grid
        container
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <GridItem size={5}>
          <Typography marginTop={5}>All tasks</Typography>
        </GridItem>
      </Grid>
    </>
  );
}
