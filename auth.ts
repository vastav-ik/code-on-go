import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (user.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
          select: { isDisabled: true },
        });

        if (dbUser?.isDisabled) return false;
      }

      return true;
    },

    async jwt({ token, user, trigger, session }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { id: user.id },
        });

        if (dbUser) {
          token.id = dbUser.id;
          token.name = dbUser.name ?? "";
          token.email = dbUser.email;
          token.role = dbUser.role;
        }
      }

      if (trigger === "update" && session) {
        return { ...token, ...session.user };
      }

      return token;
    },

    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
