import db from "@/db";
import { VerificationToken } from "@prisma/client";

export const getVerificationTokenByEmail = async (
  email: string,
): Promise<null | VerificationToken> => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });

    return verificationToken;
  } catch (err) {
    throw err;
  }
};
export const getVerificationTokenByToken = async (
  token: string,
): Promise<null | VerificationToken> => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });

    return verificationToken;
  } catch (err) {
    throw err;
  }
};
