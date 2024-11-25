import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { nextCookies } from "better-auth/next-js";

export const authClient = createAuthClient({
  // baseURL: process.env.BETTER_AUTH_URL,
  plugins: [adminClient(), nextCookies()],
});

export const { signIn, signUp, useSession } = createAuthClient();
