import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise, { getDatabase } from '@/lib/mongodb';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: '7f3a9b4c2d8e1f5b6a0c3d7e9f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9',
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        const { db } = await getDatabase();
        const users = db.collection('users');

        const [firstName, lastName] = user.name?.split(' ') ?? ['', ''];

        await users.updateOne(
          { email: user.email },
          {
            $set: {
              firstName,
              lastName,
              image: user.image,
              email: user.email,
            },
          },
          { upsert: true }
        );
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  debug: process.env.NEXTAUTH_DEBUG === 'true',
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };