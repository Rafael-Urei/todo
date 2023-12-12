import FilterProvider from "./Filter";
import TasksProvider from "./Tasks";
import UserAuthProvider from "./User";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <FilterProvider>
      <TasksProvider>
        <UserAuthProvider>{children}</UserAuthProvider>
      </TasksProvider>
    </FilterProvider>
  );
}
