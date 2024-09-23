"use client";

import { RegisterSchema } from "@/schemas";
import React, { useState } from "react";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import paths from "@/paths";
import { Button, Input } from "@nextui-org/react";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormValues>({
    mode: "onTouched",
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    console.log(data);
  };

  return (
    <CardWrapper
      headerLabel="Create an account"
      backButtonLabel="Already have an account?"
      backButtonHref={paths.login()}
      social
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Name"
              placeholder="John Doe"
              isInvalid={!!errors?.name}
              errorMessage={errors?.name?.message}
              startContent={<UserIcon className="w-4" />}
            />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Email"
              placeholder="johndoe@example.com"
              isInvalid={!!errors?.email}
              errorMessage={errors?.email?.message}
              startContent={<EnvelopeIcon className="w-4" />}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Password"
              placeholder="*****"
              isInvalid={!!errors?.password}
              errorMessage={errors?.password?.message}
              startContent={<KeyIcon className="w-4" />}
              type={isVisible ? "text" : "password"}
              endContent={
                isVisible ? (
                  <EyeIcon
                    className="w-4 cursor-pointer"
                    onClick={toggleVisibility}
                  />
                ) : (
                  <EyeSlashIcon
                    className="w-4 cursor-pointer"
                    onClick={toggleVisibility}
                  />
                )
              }
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field }) => (
            <Input
              {...field}
              variant="bordered"
              label="Confirm Password"
              placeholder="*****"
              isInvalid={!!errors?.confirmPassword}
              errorMessage={errors?.confirmPassword?.message}
              startContent={<KeyIcon className="w-4" />}
              type={isVisible ? "text" : "password"}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          size="lg"
          className="bg-foreground-800 text-white"
        >
          Create account
        </Button>
      </form>
    </CardWrapper>
  );
}
