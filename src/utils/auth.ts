import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import EmailProvider from "next-auth/providers/email";
import { db } from "./db";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  adapter: PrismaAdapter(db as any),
  providers: [
    EmailProvider({
      from: process.env.SMTP_FROM,
      sendVerificationRequest: async ({ identifier, url, provider }) => {
        console.log(identifier, url, provider);
        //getting the user from db
        const user = db.user.findUnique({
          where: {
            email: identifier,
          },
          select: {
            emailVerified: true,
          },
        });

        const deliveredEmail = await resend.emails.send({
          from: provider.from as string,
          to: identifier,
          subject: "Regarding Authentication",
          reply_to: provider.from as string,
          text: `${url} Please click the link to Authenticate.`,
        });
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user }) {
      const dbUser = db.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (!dbUser) {
        if (user) {
          token.id = user.id;
        }
      }

      return token;
    },
    redirect() {
      return "/dashboard";
    },
  },
};
