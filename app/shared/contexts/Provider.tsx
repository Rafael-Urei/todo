import FilterProvider from "./Filter";
import TasksProvider from "./Tasks";
import UserAuthProvider from "./User";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserAuthProvider>
      <FilterProvider>
        <TasksProvider>{children}</TasksProvider>
      </FilterProvider>
    </UserAuthProvider>
  );
}
