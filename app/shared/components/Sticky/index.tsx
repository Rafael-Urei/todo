import { Box, Divider, Typography } from "@mui/material";
import { TasksType } from "../../types/Tasks";
import { motion } from "framer-motion";

type Props = {
  task: TasksType;
};

export function Sticker({ task }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        borderRadius={2}
        width={300}
        height={300}
        padding={2}
        sx={{ backgroundColor: "#d2d2d2" }}
      >
        <Typography component={"h1"} fontWeight={600}>
          {task.title}
        </Typography>
        <Divider />
        <Typography component={"p"} padding={2}>
          {task.description}
        </Typography>
      </Box>
    </motion.div>
  );
}
