"use client";

import { Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { DashBoardPaperAnimation } from "../../utils/animations";
import { ReactNode } from "react";

type Props = {
  size: number;
  children: ReactNode;
};

export function GridItem({ size, children }: Props) {
  return (
    <Grid item xs={size}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={DashBoardPaperAnimation}
      >
        <Paper
          sx={{
            height: 400,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </Paper>
      </motion.div>
    </Grid>
  );
}
