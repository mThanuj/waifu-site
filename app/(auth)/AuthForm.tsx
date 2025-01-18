"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { PasswordInput } from "@/components/ui/password-input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createUser, signinUser } from "@/lib/actions/auth.actions";
import { toast } from "sonner";

export default function AuthForm({ type }: { type: "signin" | "signup" }) {
  const router = useRouter();

  const formSchemas = {
    signin: z.object({
      email: z.string().nonempty("Email is required").email("Invalid email"),
      password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long"),
    }),
    signup: z.object({
      email: z.string().nonempty("Email is required").email("Invalid email"),
      password: z
        .string()
        .nonempty("Password is required")
        .min(8, "Password must be at least 8 characters long"),
      name: z.string().nonempty("Name is required"),
    }),
  };

  const formSchema = formSchemas[type];
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues:
      type === "signup"
        ? { email: "", password: "", name: "" }
        : { email: "", password: "" },
  });

  async function handleSubmit(data: FormValues) {
    try {
      if (type === "signup") {
        await createUser(data);
        router.push("/signin");
      } else {
        await signinUser(data);
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast(error.message);
      } else {
        toast("Something went wrong");
      }
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-8 w-3/4 md:w-3/5 lg:w-1/3 mx-auto py-10"
      >
        <h1 className="font-bold text-3xl">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h1>
        {type === "signup" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="######" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-y-4 text-xs sm:text-lg ">
          <Button type="submit">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
          <div className="flex justify-start">
            {type === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              href={type === "signin" ? "/signup" : "/signin"}
              className="ml-2"
            >
              <span className="text-indigo-800 font-bold hover:underline">
                {type === "signin" ? "Sign Up" : "Sign In"}
              </span>
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
