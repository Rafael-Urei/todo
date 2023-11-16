"use client";

import { List } from "@mui/material";
import { useTasks } from "../../hooks/useTasks";
import TaskPaper from "../TaskPaper";

export default function TasksList() {
  const { filteredTasks } = useTasks();

  return (
    <List>
      {filteredTasks.map((task) => {
        return <TaskPaper key={task.id} task={task} />;
      })}
    </List>
  );
}
