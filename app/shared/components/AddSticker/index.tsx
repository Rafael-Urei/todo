"use client";

import {
  Box,
  Button,
  ButtonBase,
  IconButton,
  List,
  ListItem,
  ListItemText,
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
import { useTasks } from "../../hooks/useTasks";
import { v4 as uuid } from "uuid";
import { notifyIfFailed, notifyIfSuccess } from "../../utils/Toasts";
import { useState } from "react";
import { Delete } from "@mui/icons-material";

export function ButtonAddSticker() {
  const { openModal: openStickerModal, ...stickerModalProps } = useModal(
    ModalType.ADD_STICKER
  );

  const { stickers, setStickers } = useTasks();

  const [listOfItens, setListOfItens] = useState<string[]>([]);

  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Stickers>({ resolver: zodResolver(StickerForm) });

  const handleResetOnClose = () => {
    stickerModalProps.onClose();
    reset();
  };

  const onSubmit = (data: Stickers) => {
    try {
      setStickers((prev) => {
        return [...prev, { ...data, id: uuid() }];
      });
    } catch (error) {
      notifyIfFailed("Failed while creating your sticker.");
      handleResetOnClose();
    } finally {
      notifyIfSuccess("Your sticker was created with success!");
      handleResetOnClose();
    }
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
          onSubmit={handleSubmit(onSubmit)}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
        >
          <Box marginTop={2}>
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
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button type="button" onClick={handleResetOnClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </Box>
        </Box>
      </ModalComponent>
    </>
  );
}
