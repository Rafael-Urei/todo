import { AddTaskButton } from "../shared/components/AddTasks";
import { FilterBar } from "../shared/components/FilterBar";
import TasksList from "../shared/components/Tasks/Tasks";
import PageLayout from "../shared/layouts/TasksLayout";

export default function AllTasksPage() {
  return (
    <PageLayout title="All Tasks">
      <FilterBar />
      <AddTaskButton />
      <TasksList></TasksList>
    </PageLayout>
  );
}
