"use client";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  IconButton,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { TasksType } from "../../types/Tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../schema/formSchema";
import { taskTypes } from "../../utils/types";
import { useModal } from "../../hooks/useModal";
import { ModalType } from "../../types/ModalType";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTasks } from "../../hooks/useTasks";
import { notifyIfFailed, notifyIfSuccess } from "../../utils/Toasts";
import { ModalComponent } from "../Modal";
import { Edit } from "@mui/icons-material";

type Props = {
  prop: TasksType;
};

export function EditTask({ prop }: Props) {
  const { openModal: openEditModal, ...editModalProps } = useModal(
    ModalType.EDIT_TASK
  );

  const { tasks, setTasks } = useTasks();

  const {
    register,
    control,
    clearErrors,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TasksType>({
    resolver: zodResolver(Form),
  });

  const onSubmit = (data: TasksType) => {
    try {
      const newData = { ...data, id: prop.id };
      const newTask = tasks.map((task) => {
        if (task.id === prop.id) {
          return { ...newData };
        } else {
          return task;
        }
      });
      setTasks(newTask);
      notifyIfSuccess("Task edited with success!");
    } catch (error) {
      notifyIfFailed(
        "An error occurred while editing your task, please try again."
      );
    } finally {
      reset();
      clearErrors();
      editModalProps.onClose();
    }
  };

  return (
    <>
      <IconButton onClick={openEditModal}>
        <Edit />
      </IconButton>
      <ModalComponent
        title="Edit Task"
        open={editModalProps.modal === ModalType.EDIT_TASK}
        close={editModalProps.onClose}
      >
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Box>
            <Typography>Title</Typography>
            <TextField
              variant="standard"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box>
            <Typography>Description</Typography>
            <TextField
              variant="standard"
              {...register("description")}
              sx={{ width: "100%" }}
            />
          </Box>
          <Box>
            <Typography>Type</Typography>
            <Controller
              name="type"
              control={control}
              defaultValue={[]}
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  multiple
                  defaultValue={[]}
                  options={taskTypes}
                  getOptionLabel={(option) => option}
                  onChange={(event, optionsArray) => {
                    onChange(optionsArray);
                    clearErrors();
                  }}
                  disableCloseOnSelect
                  renderOption={(props, option) => {
                    return (
                      <ListItem {...props} key={option}>
                        {option}
                      </ListItem>
                    );
                  }}
                  renderTags={(tagValue) => {
                    return tagValue.map((option, index) => (
                      <Chip key={option} label={option} sx={{ marginX: 1 }} />
                    ));
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      key={params.id}
                      {...params}
                      error={!!errors.type}
                      helperText={errors.type?.message}
                      sx={{
                        border: "none",
                        outline: "none",
                        boxShadow: "none",
                      }}
                    />
                  )}
                />
              )}
            />
          </Box>
          <Box>
            <Typography>Date</Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Controller
                name="date"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    onChange={(value: Date | null) => {
                      onChange(value?.toISOString());
                    }}
                  />
                )}
              />
            </LocalizationProvider>
          </Box>
          <Button type="submit">Submit</Button>
        </Box>
      </ModalComponent>
    </>
  );
}
