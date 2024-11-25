import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import { admin } from "better-auth/plugins";
import { Resend } from "resend";
import ResetPasswordEmail from "@/emails/reset-password";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    `${process.env.BETTER_AUTH_URL}`,
    `${process.env.BETTER_AUTH_URL}/signin`,
    `${process.env.BETTER_AUTH_URL}/reset-password`,
    `${process.env.BETTER_AUTH_URL}/dashboard`,
    `${process.env.BETTER_AUTH_URL}/signup`,
    `${process.env.BETTER_AUTH_URL}/forget-password`,
  ],
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60 * 24 * 7,
    },
  },
  plugins: [admin()],
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: "Password Reset <noreply@aditiaprs.com>",
        to: user.email,
        subject: "Reset Your Password",
        react: ResetPasswordEmail({
          username: user.name,
          resetLink: url,
        }),
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
    },
  },
});
