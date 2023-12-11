import { TasksType } from "../types/Tasks";

export function filterTasks(tasks: TasksType[], type: string) {
    if (tasks.length > 0) {
        return tasks.filter((task) => task.type.includes(type)).length;
    } else {
        return 1
    }
}