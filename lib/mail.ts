import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async (
  email: string,
  token: string,
): Promise<void> => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  console.log({ confirmLink });

  try {
    await resend.emails.send({
      from: "Your website name",
      to: email,
      subject: "Verify your email",
      html: `<p>Click <a href=${confirmLink}>here</a> to confirm your email!</p>`,
    });
  } catch (err) {
    throw err;
  }
};
