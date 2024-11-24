"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast, Toaster } from "sonner";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export default function ForgetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await authClient.forgetPassword(
      {
        email: values.email,
        redirectTo: "/reset-password",
      },
      {
        onError: (error) => {
          setIsLoading(false);
          toast.error(error.error.message);
        },

        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: () => {
          setIsLoading(false);
          setSuccess(true);
        },
      }
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-background">
      <Toaster closeButton />
      {success && (
        <div className="w-full max-w-md space-y-8 flex flex-col justify-center">
          <p>We've sent you an email with a link to reset your password</p>
          <Button className="mx-auto">
            <Link href="/signin">Back to Sign in</Link>
          </Button>
        </div>
      )}
      {!success && (
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Forgot your password?
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter your email address below and we'll send you a link to reset
              your password.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-6"
            >
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="name@example.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Send Reset Link
                </Button>

                <div className="text-center">
                  <Link
                    href="/signin"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    Back to Sign in
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
