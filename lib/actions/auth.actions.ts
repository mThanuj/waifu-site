"use server";

import { signIn } from "@/auth";
import axios from "axios";

export const createUser = async (formData: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_BASE_URL}/api/auth/users/signup`,
      formData,
    );
    return { success: response.status === 200, status: response.status };
  } catch (error) {
    console.log(error);
  }
};

export const signinUser = async (formData: {
  email: string;
  password: string;
}) => {
  try {
    const result = await signIn("credentials", {
      ...formData,
      redirect: false,
    });

    if (result?.error) {
      throw new Error(result.error);
    }

    if (result?.ok) {
      return result;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        error.message || "An unknown error occurred during sign-in.",
      );
    }

    throw new Error("An unexpected error occurred during sign-in.");
  }
};
