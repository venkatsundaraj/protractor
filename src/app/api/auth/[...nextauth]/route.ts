import { authOptions } from "@/utils/auth";
import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth/next";

export const authHandler = NextAuth(authOptions);

export { authHandler as GET, authHandler as POST };
