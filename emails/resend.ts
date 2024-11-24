import { Resend } from "resend";
import ResetPasswordEmail from "./reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (
  email: string,
  username: string,
  resetLink: string
) => {
  try {
    const data = await resend.emails.send({
      from: "Better Auth <noreply@betterauth.com>",
      to: email,
      subject: "Reset Your Password",
      react: ResetPasswordEmail({
        username,
        resetLink,
      }),
    });

    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
