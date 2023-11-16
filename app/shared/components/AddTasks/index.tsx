"use client";

import {
  Autocomplete,
  Box,
  Button,
  Chip,
  ListItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useModal } from "../../hooks/useModal";
import { ModalType } from "../../types/ModalType";
import { ModalComponent } from "../Modal";
import { useState } from "react";
import { labels } from "../../utils/addTasksFormLabels";
import { Controller, useForm } from "react-hook-form";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { formatDateToString } from "../../utils/formatDate";
import { TasksType } from "../../types/Tasks";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../schema/formSchema";
import { createTask } from "../../services/tasks";
import { useTasks } from "../../hooks/useTasks";

const selected = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: "auto",
};

const notSelected = {
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  height: 0,
};

const options = [
  { id: 1, title: "Study" },
  { id: 2, title: "Work" },
  { id: 3, title: "Trip" },
  { id: 4, title: "Personal" },
];

export function AddTaskButton() {
  const { openModal: openAddTaskModal, ...addModalProps } = useModal(
    ModalType.ADD_TASK
  );

  const { setTasks } = useTasks();

  const {
    register,
    formState: { errors },
    control,
    getValues,
    handleSubmit,
    trigger,
    clearErrors,
    reset,
  } = useForm<TasksType>({ resolver: zodResolver(Form) });

  const [active, setActive] = useState(0);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const onSubmit = (data: TasksType) => {
    console.log(data);
    createTask(data, setTasks);
  };

  const handleNext = () => {
    {
      triggerError() && setActive((prev) => prev + 1), clearErrors();
      console.log(getValues("type"));
    }
  };

  const handleBack = () => {
    if (active > 0) setActive((prev) => prev - 1);
  };

  const handleReset = () => {
    reset();
    setActive(0);
  };

  const triggerError = () => {
    if (active === 0 && !getValues("title")) {
      trigger("title");
      return false;
    } else if (active === 2 && getValues("type").length === 0) {
      trigger("type");
      return false;
    } else if (active === 3 && !getValues("date")) {
      trigger("date");
      return false;
    } else return true;
  };

  return (
    <>
      <Button onClick={openAddTaskModal}>Add Task</Button>
      <ModalComponent
        title="Create your task"
        open={addModalProps.modal === ModalType.ADD_TASK}
        close={addModalProps.onClose}
      >
        <Stepper activeStep={active} sx={{ marginTop: 5 }}>
          {labels.map((label) => {
            return (
              <Step key={label} sx={{ cursor: "pointer" }}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box display={"flex"} flexDirection={"column"} marginY={5}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={active === 0 ? selected : notSelected}>
              <Typography>Title</Typography>
              <TextField
                {...register("title")}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            </Box>
            <Box sx={active === 1 ? selected : notSelected}>
              <Typography>Description</Typography>
              <TextField {...register("description")} />
            </Box>
            <Box sx={active === 2 ? selected : notSelected}>
              <Typography>Type</Typography>
              <Controller
                name="type"
                control={control}
                defaultValue={[]}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    multiple
                    defaultValue={[]}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, optionsArray) => {
                      onChange(optionsArray);
                      clearErrors("type");
                    }}
                    disableCloseOnSelect
                    options={options}
                    renderOption={(props, option) => {
                      return (
                        <ListItem {...props} key={option.id}>
                          {option.title}
                        </ListItem>
                      );
                    }}
                    renderTags={(tagValue) => {
                      return tagValue.map((option, index) => (
                        <Chip
                          key={option.id}
                          label={option.title}
                          sx={{ marginX: 1 }}
                        />
                      ));
                    }}
                    renderInput={(params) => (
                      <TextField
                        key={params.id}
                        {...params}
                        error={!!errors.type}
                        helperText={errors.type?.message}
                      />
                    )}
                  />
                )}
              />
            </Box>
            <Box sx={active === 3 ? selected : notSelected}>
              <Typography>Date</Typography>
              <TextField
                {...register("date")}
                value={formatDateToString(selectedDate)}
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  onChange={(value: Date | null) => setSelectedDate(value)}
                />
              </LocalizationProvider>
            </Box>
          </form>

          {active === labels.length - 1 ? (
            <Box marginTop={2} display={"flex"}>
              <Button type="button" onClick={handleBack}>
                Back
              </Button>

              <Button type="submit" onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>

              <Button type="reset" onClick={handleReset}>
                Reset
              </Button>
            </Box>
          ) : (
            <Box marginTop={2} display={"flex"}>
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </Box>
          )}
        </Box>
      </ModalComponent>
    </>
  );
}
