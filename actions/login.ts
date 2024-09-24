"use server";

import { getUserByEmail } from "@/data/user";
import { LoginSchema } from "@/schemas";
import { User } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

type LoginResponse =
  | { error: string; success?: undefined }
  | { error?: undefined; success: string };

export const login = async (
  values: z.infer<typeof LoginSchema>,
): Promise<LoginResponse> => {
  await new Promise((r) => setTimeout(r, 2000));

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password } = validatedFields.data;

  let existingUser: User | null = null;
  try {
    existingUser = await getUserByEmail(email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error checking user existence!" };
  }

  if (!existingUser || !existingUser.email || !existingUser.password)
    return { error: "Invalid credentials!" };

  const isPasswordsMatch = await bcrypt.compare(
    password,
    existingUser.password,
  );

  if (!isPasswordsMatch) return { error: "Invalid credentials!" };

  // TODO: Check if email not verified Send verification email

  //  Sign in here
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: err.message };
    }
    throw err;
  }

  return { success: "Successful login!" };
};
