import { useContext } from "react";
import { TasksContext } from "../contexts/Tasks";
import { AuthContext } from "../contexts/User";

export function useAuth() {
  return useContext(AuthContext);
}
