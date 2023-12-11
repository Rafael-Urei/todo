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
import { Stickers } from "../types/Stickers";

interface TasksContextData {
  tasks: TasksType[];
  setTasks: Dispatch<SetStateAction<TasksType[]>>;
  filteredTasks: TasksType[];
  stickers: Stickers[];
  setStickers: Dispatch<SetStateAction<Stickers[]>>;
}

export const TasksContext = createContext({} as TasksContextData);

export default function TasksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { search, type, date } = useFilter();

  const searchDeferred = useDeferredValue(search);

  const [tasks, setTasks] = useState<any[]>([]);

  const [stickers, setStickers] = useState<Stickers[]>([]);

  const filteredTasks = tasks.filter((task, index) => {
    if (type === FilterType.ALL && !date)
      return task.title.toLowerCase().includes(searchDeferred.toLowerCase());
    if (date && getDate(date) === getDate(new Date(task.date)))
      return getDate(date) === getDate(new Date(task.date));
    return task.type.includes(FilterType[type]);
  });

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks, filteredTasks, stickers, setStickers }}
    >
      {children}
    </TasksContext.Provider>
  );
}
