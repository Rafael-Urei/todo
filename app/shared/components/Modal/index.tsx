"use client";

import {
  Modal,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

type Props = {
  title?: string;
  children: React.ReactNode;
  open: boolean;
  close: () => void;
};

const desktop = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const mobile = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

export function ModalComponent({ title, children, open, close }: Props) {
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Modal keepMounted open={open} onClose={close}>
      <Paper sx={!match ? desktop : mobile}>
        <Typography variant="h1" fontSize={40}>
          {title || null}
        </Typography>
        {children}
      </Paper>
    </Modal>
  );
}
