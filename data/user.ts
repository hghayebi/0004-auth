import db from "@/db";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export const getUserByEmail = async (email: string): Promise<null | User> => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    return user;
  } catch (err) {
    throw err;
  }
};
export const getUserById = async (id: string): Promise<null | User> => {
  try {
    const user = await db.user.findUnique({
      where: { id },
    });

    return user;
  } catch (err) {
    throw err;
  }
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
): Promise<User | null> => {
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return user;
  } catch (err) {
    throw err;
  }
};
