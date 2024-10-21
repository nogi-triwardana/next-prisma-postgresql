import NextAuth from "next-auth/next";
import ProviderCredentials from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
  providers: [
    ProviderCredentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: '' },
        password: { label: 'Password', type: 'password', placeholder: '' },
      },
      async authorize(credentials, req) {
        try {
          const res: any = await axios.post('http://localhost:4000/api/auth/login', {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data && res.data.token) {
            return { token: res.data.token, user: res.data.user, id: res.data?._id };
          }
          return null;
        } catch (error) {
          throw new Error('Invalid email or password');
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if(user) {
        token.accessToken = user.token;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: '/',
  },
});