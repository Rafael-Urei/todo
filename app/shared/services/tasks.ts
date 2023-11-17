import { Dispatch, SetStateAction } from "react";
import { TasksType } from "../types/Tasks";
import { notifyIfFailed, notifyIfSuccess } from "../utils/Toasts";
import {v4} from 'uuid';
import { formatISO } from "date-fns";

export const createTask = (data: TasksType, setTasks: Dispatch<SetStateAction<TasksType[]>>) => {
    try {
        setTasks(prev => {
            return [
                ...prev,
                {...data, id: v4()}
            ]
        })
        notifyIfSuccess('Task created with success!')
    } catch (error) {
        notifyIfFailed('An error has occurred while creating your task, please try again.')
    }
};