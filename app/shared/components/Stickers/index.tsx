"use client";

import { List } from "@mui/material";
import { useTasks } from "../../hooks/useTasks";
import { Sticker } from "../Sticky";
import { ButtonAddSticker } from "../AddSticker";

export default function StickersList() {
  const { filteredTasks } = useTasks();

  return (
    <List
      sx={{
        display: "flex",
        gap: 2,
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <ButtonAddSticker />
      {filteredTasks.map((task) => {
        return <Sticker key={task.id} task={task} />;
      })}
    </List>
  );
}
