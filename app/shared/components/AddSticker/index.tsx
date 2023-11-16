import { Box, ButtonBase } from "@mui/material";
import { Plus } from "lucide-react";

export function ButtonAddSticker() {
  return (
    <ButtonBase>
      <Box
        display={"flex"}
        flexDirection={"column"}
        borderRadius={2}
        width={300}
        height={300}
        padding={2}
        sx={{ backgroundColor: "#d2d2d2" }}
      >
        <Plus />
      </Box>
    </ButtonBase>
  );
}
