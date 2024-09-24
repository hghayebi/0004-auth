import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "./db";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (!validatedFields.success) return null;

        const { email, password } = validatedFields.data;

        let existingUser: User | null = null;
        try {
          existingUser = await getUserByEmail(email);
        } catch (err) {
          if (err instanceof Error) return null;
          return null;
        }

        if (!existingUser || !existingUser.email || !existingUser.password)
          return null;

        const isPasswordsMatch = await bcrypt.compare(
          password,
          existingUser.password,
        );

        if (!isPasswordsMatch) return null;

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: pass, ...userWithoutPassword } = existingUser;

        return userWithoutPassword;
      },
    }),
  ],
});
