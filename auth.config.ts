import GoogleProvider from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import prisma from "./lib/prisma";

const authConfig: NextAuthConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              name: user.name,
              email: user.email,
              image: user.image,
            },
          });
        }

        return true;
      } catch (error) {
        console.log("Error signing in:", error);
        return false;
      }
    },

    async session({ session, user }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
        },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
      }
      
      return session;
    },
  },
};

export default authConfig;
