import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/database";
import { usersTable } from "@/database/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        email: { type: "email", required: true },
        password: { type: "password", required: true },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (
          !email ||
          !password ||
          typeof email !== "string" ||
          typeof password !== "string"
        ) {
          throw new Error("Email and password are required");
        }

        const users = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, email));
        if (users.length === 0) {
          throw new Error("Invalid credentials");
        }

        const user = users[0];
        if (!user.password) {
          throw new Error("Login with OAuth provider");
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          throw new Error("Invalid email or password");
        }

        return {
          name: user.name,
          email: user.email,
          id: user.id,
          picture: user.picture,
          createdAt: user.createdAt,
        };
      },
    }),
  ],
});
