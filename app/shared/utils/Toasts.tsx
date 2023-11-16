import { Alert, AlertTitle } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";

export function notifyIfSuccess(msg: string) {
  return toast.custom(
    () => (
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Alert severity="success">
          <AlertTitle>{msg}</AlertTitle>
        </Alert>
      </motion.div>
    ),
    { position: "bottom-right" }
  );
}

export function notifyIfFailed(msg: string) {
  return toast.custom(
    () => (
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Alert severity="error">
          <AlertTitle>{msg}</AlertTitle>
        </Alert>
      </motion.div>
    ),
    { position: "bottom-right" }
  );
}
