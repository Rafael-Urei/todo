import { Container, Typography } from "@mui/material";
import React from "react";
import { Toaster } from "react-hot-toast";

type Props = {
  title: string;
  children: React.ReactNode;
};

export default function PageLayout({ title, children }: Props) {
  return (
    <Container>
      <Typography variant="h1" fontSize={40} marginY={5}>
        {title}
      </Typography>
      {children}
      <Toaster />
    </Container>
  );
}
