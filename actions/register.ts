"use server";

import { createUser, getUserByEmail } from "@/data/user";
import { sendVerificationMail } from "@/lib/mail";
import { generateVerificationTokenByEmail } from "@/lib/tokens";
import { RegisterSchema } from "@/schemas";
import { User, VerificationToken } from "@prisma/client";
import { z } from "zod";

type RegisterResponse =
  | { error: string; success?: undefined }
  | { error?: undefined; success: string };

export const register = async (
  values: z.infer<typeof RegisterSchema>,
): Promise<RegisterResponse> => {
  await new Promise((r) => setTimeout(r, 2000));

  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { name, email, password } = validatedFields.data;

  let existingUser: User | null = null;
  try {
    existingUser = await getUserByEmail(email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error checking user existence!" };
  }

  if (existingUser) return { error: "Email already in use!" };

  //  Send verification email
  let verificationToken: VerificationToken | null = null;
  try {
    verificationToken = await generateVerificationTokenByEmail(email);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error generating token!" };
  }

  if (!verificationToken) return { error: "Error generating token!" };

  try {
    await sendVerificationMail(
      verificationToken.email,
      verificationToken.token,
    );
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error sending token!" };
  }

  let newUser: User | null = null;
  try {
    newUser = await createUser(name, email, password);
  } catch (err) {
    if (err instanceof Error) return { error: err.message };
    return { error: "Error creating new user, please try again later" };
  }

  if (!newUser)
    return { error: "Error creating new user, please try again later" };

  return { success: "Verification email sent!" };
};
