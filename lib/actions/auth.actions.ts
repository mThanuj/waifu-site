"use server";

import { signIn } from "@/auth";
import axios from "axios";
import { CredentialsSignin } from "next-auth";

export const createUser = async (formData: {
  email: string;
  password: string;
  name?: string;
}) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/auth/users/signup",
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
    await signIn("credentials", formData);
  } catch (error) {
    const err = error as CredentialsSignin;
    throw new Error(err.cause?.err?.message);
  }
};
