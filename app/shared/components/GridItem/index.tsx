"use client";

import { Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { DashBoardPaperAnimation } from "../../utils/animations";

type Props = {
  size: number;
};

export function GridItem({ size }: Props) {
  return (
    <Grid item xs={size} height={400}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={DashBoardPaperAnimation}
      >
        <Paper sx={{ height: 350 }}></Paper>
      </motion.div>
    </Grid>
  );
}
