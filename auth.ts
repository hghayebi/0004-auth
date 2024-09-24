import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";
import db from "./db";
import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./data/user";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export type UserExtended = Omit<User, "password"> & DefaultSession["user"];

declare module "next-auth" {
  interface Session {
    user: UserExtended;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  adapter: PrismaAdapter(db),

  callbacks: {
    async jwt({ token, user }) {
      if (token && user) {
        token.user = user;
      }

      return token;
    },

    async session({ session, token }) {
      if (session && token.user) {
        session.user = { ...session.user, ...token.user };
      }
      return session;
    },
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
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
