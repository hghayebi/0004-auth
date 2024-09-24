import { getVerificationTokenByEmail } from "@/data/verification-token";
import db from "@/db";
import { VerificationToken } from "@prisma/client";
import { v4 as uuid } from "uuid";

export const generateVerificationTokenByEmail = async (
  email: string,
): Promise<VerificationToken | null> => {
  let existingToken: VerificationToken | null = null;
  try {
    existingToken = await getVerificationTokenByEmail(email);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {}

  if (existingToken) {
    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const token = uuid();
  const expires = new Date(new Date().getTime() + 5 * 60 * 1000);

  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    return verificationToken;
  } catch (err) {
    throw err;
  }
};
