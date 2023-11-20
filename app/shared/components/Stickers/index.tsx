"use client";

import { List } from "@mui/material";
import { useTasks } from "../../hooks/useTasks";
import { Sticker } from "../Sticky";
import { ButtonAddSticker } from "../AddSticker";

export default function StickersList() {
  const { stickers } = useTasks();

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
      {stickers.map((sticker) => {
        return <Sticker key={sticker.id} prop={sticker} />;
      })}
    </List>
  );
}
