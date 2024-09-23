"use client";

import { RegisterSchema } from "@/schemas";
import React, { useState, useTransition } from "react";
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
import FormError from "../common/form-error";
import FormSuccess from "../common/form-success";
import actions from "@/actions";

type RegisterFormValues = z.infer<typeof RegisterSchema>;

export default function RegisterForm() {
  const [isPending, startTransition] = useTransition();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    setError("");
    setSuccess("");

    startTransition(async () => {
      const result = await actions.register(data);

      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSuccess(result.success);

        setValue("name", "");
        setValue("email", "");
        setValue("password", "");
        setValue("confirmPassword", "");
      }
    });
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
              isDisabled={isPending}
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
              isDisabled={isPending}
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
              isDisabled={isPending}
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
              isDisabled={isPending}
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

        <FormError message={error} />
        <FormSuccess message={success} />

        <Button
          type="submit"
          isLoading={isPending}
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
