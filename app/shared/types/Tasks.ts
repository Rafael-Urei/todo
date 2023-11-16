import { Labels } from "./Labels";

export interface TasksType {
    id: string,
    title: string,
    description: string,
    type: Labels[],
    date: string
}