"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useDeferredValue,
  useState,
} from "react";
import { useFilter } from "../hooks/useFilter";
import { TasksType } from "../types/Tasks";
import { FilterType } from "../types/FilterType";
import { getDate } from "date-fns";

interface TasksContextData {
  tasks: TasksType[];
  setTasks: Dispatch<SetStateAction<TasksType[]>>;
  filteredTasks: TasksType[];
}

export const TasksContext = createContext({} as TasksContextData);

export default function TasksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { search, type, date } = useFilter();

  const searchDeferred = useDeferredValue(search);

  const [tasks, setTasks] = useState<TasksType[]>([
    {
      id: "1",
      title: "Study React",
      description: "Lorem",
      type: ["Study"],
      date: "2023-11-16T00:00:00-03:00",
    },
    {
      id: "2",
      title: "Work",
      description: "Lorem",
      type: ["Work"],
      date: "2023-11-18T00:00:00-03:00",
    },
    {
      id: "3",
      title: "Travel to Rio de Janeiro",
      description: "Lorem",
      type: ["Trip"],
      date: "2023-11-20T00:00:00-03:00",
    },
    {
      id: "4",
      title: "Play Resident Evil 4",
      description: "Lorem",
      type: ["Personal"],
      date: "2023-11-25T00:00:00-03:00",
    },
  ]);

  const filteredTasks = tasks.filter((task) => {
    if (type === FilterType.ALL && !date)
      return task.title.toLowerCase().includes(searchDeferred.toLowerCase());
    if (date && getDate(date) === getDate(new Date(task.date)))
      return getDate(date) === getDate(new Date(task.date));
    return task.type[0].toLowerCase() === FilterType[type].toLowerCase();
  });

  return (
    <TasksContext.Provider value={{ tasks, setTasks, filteredTasks }}>
      {children}
    </TasksContext.Provider>
  );
}
