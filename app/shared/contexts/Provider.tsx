import FilterProvider from "./Filter";
import TasksProvider from "./Tasks";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FilterProvider>
      <TasksProvider>{children}</TasksProvider>
    </FilterProvider>
  );
}
