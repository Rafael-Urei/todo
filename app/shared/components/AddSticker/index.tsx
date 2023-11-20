"use client";

import {
  Box,
  Button,
  ButtonBase,
  Paper,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { Plus } from "lucide-react";
import { ModalComponent } from "../Modal";
import { useModal } from "../../hooks/useModal";
import { ModalType } from "../../types/ModalType";
import { useForm } from "react-hook-form";
import { Stickers } from "../../types/Stickers";
import { zodResolver } from "@hookform/resolvers/zod";
import { StickerForm } from "../../schema/formSchema";

export function ButtonAddSticker() {
  const { openModal: openStickerModal, ...stickerModalProps } = useModal(
    ModalType.ADD_STICKER
  );

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<Stickers>({ resolver: zodResolver(StickerForm) });

  const handleResetOnClose = () => {
    stickerModalProps.onClose();
    reset();
  };

  const onSubmit = (data: Stickers) => {
    handleResetOnClose();
  };

  return (
    <>
      <ButtonBase onClick={openStickerModal}>
        <Paper
          sx={{
            display: "flex",
            height: 300,
            width: 300,
            padding: 3,
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Plus />
        </Paper>
      </ButtonBase>
      <ModalComponent
        title="Create a sticker"
        open={stickerModalProps.modal === ModalType.ADD_STICKER}
        close={handleResetOnClose}
      >
        <Box
          component={"form"}
          display={"flex"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Paper
            sx={{
              display: "flex",
              height: 300,
              width: "100%",
              padding: 3,
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Box display={"flex"} alignItems={"center"} gap={1}>
              <Typography>Title</Typography>
              <TextField
                {...register("title")}
                variant="standard"
                error={!!errors.title}
                helperText={errors.title?.message}
                fullWidth
              />
            </Box>
            <Box flex={1}>
              <Typography>Description</Typography>
              <TextField
                {...register("description")}
                fullWidth
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            </Box>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Button type="button" onClick={handleResetOnClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </Box>
          </Paper>
        </Box>
      </ModalComponent>
    </>
  );
}
