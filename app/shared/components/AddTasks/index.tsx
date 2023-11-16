"use client";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
import { Labels } from "../../types/Labels";

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

export function AddTaskButton() {
  const { openModal: openAddTaskModal, ...addModalProps } = useModal(
    ModalType.ADD_TASK
  );

  const {
    register,
    formState: { errors },
    control,
  } = useForm();

  const [active, setActive] = useState(0);

  const [selectedTypes, setSelectedTypes] = useState<Labels[]>();

  const handleNext = () => {
    setActive((prev) => prev + 1);
  };

  const handleBack = () => {
    if (active > 0) setActive((prev) => prev - 1);
  };

  const handleReset = () => {
    setActive(0);
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
          {labels.map((label, index) => {
            return (
              <Step key={label.id} sx={{ cursor: "pointer" }}>
                <StepLabel>{label.title}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <Box display={"flex"} flexDirection={"column"} marginY={5}>
          <form>
            <Box sx={active === 0 ? selected : notSelected}>
              <Typography>Title</Typography>
              <TextField {...register("title")} />
            </Box>
            <Box sx={active === 1 ? selected : notSelected}>
              <Typography>Description</Typography>
              <TextField {...register("Description")} />
            </Box>
            <Box sx={active === 2 ? selected : notSelected}>
              <Typography>Type</Typography>
              <Controller
                name="category"
                control={control}
                defaultValue={[]}
                render={({ field: { value, onChange } }) => (
                  <Autocomplete
                    multiple
                    defaultValue={[]}
                    getOptionLabel={(option) => option.title}
                    onChange={(event, optionsArray) =>
                      setSelectedTypes(optionsArray)
                    }
                    disableCloseOnSelect
                    options={labels}
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
                      <TextField key={params.id} {...params} />
                    )}
                  />
                )}
              />
            </Box>
            <Box sx={active === 3 ? selected : notSelected}>
              <Typography>Date</Typography>
              <TextField {...register("date")} />
            </Box>
          </form>

          {active === labels.length - 1 ? (
            <Box marginTop={2} display={"flex"}>
              <Button type="button" onClick={handleBack}>
                Back
              </Button>

              <Button type="submit">Submit</Button>
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
