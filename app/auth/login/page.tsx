"use client";

import { Auth, authSchema } from "@/app/shared/schema/authSchema";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useAuth } from "@/app/shared/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AuthLoginPage() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Auth>();
  const authMethods = useForm<Auth>({ resolver: zodResolver(authSchema) });
  const { signIn, user } = useAuth();

  const onSubmit = (data: Auth) => {
    signIn(data);
    console.log(user);
  };

  return (
    <>
      <FormProvider {...authMethods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center justify-between gap-8"
        >
          <Box marginBottom={2}>
            <Typography>Email</Typography>
            <TextField
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Box>
          <Box>
            <Typography>Password</Typography>
            <TextField
              {...register("password_hash")}
              error={!!errors.password_hash}
              helperText={errors.password_hash?.message}
            />
          </Box>
          <Button type="submit">Submit</Button>
        </form>
      </FormProvider>
    </>
  );
}
