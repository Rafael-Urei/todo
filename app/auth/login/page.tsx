"use client";

import { Auth, authSchema } from "@/app/shared/schema/authSchema";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  ButtonBase,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useAuth } from "@/app/shared/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import PageLayout from "@/app/shared/layouts/TasksLayout";
import { useRouter } from "next/navigation";
import { notifyIfFailed, notifyIfSuccess } from "@/app/shared/utils/Toasts";

export default function AuthLoginPage() {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Auth>({ resolver: zodResolver(authSchema) });
  const { signIn, user } = useAuth();

  const onSubmit = (data: Auth) => {
    try {
      signIn(data);
    } catch (error) {
      notifyIfFailed("Failed to loggin!");
    } finally {
      notifyIfSuccess("Logged with success!");
      router.push("/tasks");
    }
  };

  return (
    <>
      <PageLayout title="Login Page">
        <Box
          display={"flex"}
          width={"100%"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            display="flex"
            flexDirection={"column"}
            minWidth={300}
            width={600}
            component={"form"}
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center justify-between gap-8"
          >
            <Box marginBottom={2}>
              <Typography>Email</Typography>
              <TextField
                sx={{ width: "100%" }}
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>
            <Box>
              <Typography>Password</Typography>
              <TextField
                sx={{ width: "100%" }}
                {...register("password_hash")}
                error={!!errors.password_hash}
                helperText={errors.password_hash?.message}
              />
            </Box>
            <ButtonBase type="submit" sx={{ marginY: 3 }}>
              <Typography>Sign In</Typography>
            </ButtonBase>
          </Box>
        </Box>
      </PageLayout>
    </>
  );
}
