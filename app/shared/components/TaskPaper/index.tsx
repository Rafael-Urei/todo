"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import { formatType } from "../../utils/formatType";
import { TasksType } from "../../types/Tasks";
import { motion } from "framer-motion";
import { Trash } from "lucide-react";
import { Edit, ExpandMore } from "@mui/icons-material";
import { ModalType } from "../../types/ModalType";
import { useModal } from "../../hooks/useModal";
import { ModalComponent } from "../Modal";
import { notifyIfFailed, notifyIfSuccess } from "../../utils/Toasts";
import { format } from "date-fns";

type Props = {
  task: TasksType;
};

function TaskPaper({ task }: Props) {
  const { openModal: openDeleteModal, ...deleteModalProps } = useModal(
    ModalType.DELETE_TASK
  );
  const { openModal: openEditModal, ...editModalProps } = useModal(
    ModalType.EDIT_TASK
  );

  const handleDeleteTask = () => {
    notifyIfSuccess(`${task.title} deleted with success!`);
    notifyIfFailed(`${task.title} delete failed!`);
    deleteModalProps.onClose();
  };

  const handleEditTask = () => {
    notifyIfSuccess(`${task.title} was changed with success!`);
    notifyIfFailed(`${task.title} edit failed!`);
    editModalProps.onClose();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
      >
        <Card sx={{ minWidth: 400, margin: 2 }}>
          <CardHeader
            avatar={
              <Chip
                label={task.type.map((type) => type.title)}
                variant="outlined"
              />
            }
            title={task.title}
            subheader={format(new Date(task.date), "yyyy/MM/dd cccc")}
          ></CardHeader>
          <Accordion component={"div"} sx={{ width: "100%" }}>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography padding={2}>{task.description}</Typography>
              <Divider />
              <Box
                width={"100%"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"flex-end"}
                marginTop={2}
              >
                <IconButton onClick={openDeleteModal}>
                  <Trash color="#e11d48" />
                </IconButton>
                <IconButton onClick={openEditModal}>
                  <Edit />
                </IconButton>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Card>
      </motion.div>

      <ModalComponent
        title="Delete this task?"
        open={deleteModalProps.modal === ModalType.DELETE_TASK}
        close={deleteModalProps.onClose}
      >
        <Typography padding={4} textAlign={"center"}>
          This process cannot be undone, are you sure you want to delete this
          task?
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button onClick={deleteModalProps.onClose}>Cancel</Button>
          <Button onClick={handleDeleteTask}>Delete</Button>
        </Box>
      </ModalComponent>

      <ModalComponent
        title="Save Changes?"
        open={editModalProps.modal === ModalType.EDIT_TASK}
        close={editModalProps.onClose}
      >
        <Typography padding={4} textAlign={"center"}>
          This process cannot be undone, are you sure you want to edit this
          task?
        </Typography>
        <Box display={"flex"} justifyContent={"space-between"}>
          <Button onClick={editModalProps.onClose}>Cancel</Button>
          <Button onClick={handleEditTask}>Save Changes</Button>
        </Box>
      </ModalComponent>
    </>
  );
}

export default memo(TaskPaper);
