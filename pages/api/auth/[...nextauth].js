import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '../../../lib/mongodb'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ account, profile }) {
      const client = await clientPromise
      const db = client.db('db_unemi_parking')
      
      if (account.provider === 'google') {
        const user = await db.collection('users').findOne({ email: profile.email })

        if (user) {
          if (user.status === 1) {  // Activo
            console.log("SignIn: Success")
            return true
          } else if (user.status === 0) {  // Pendiente
            console.log("SignIn: Pending, access denied")
            return `/login?error=pending`
          }
        } else {
          const emailDomain = profile.email.split('@')[1]
          const isUnemiDomain = emailDomain === 'unemi.edu.ec'

          if (isUnemiDomain) {
            await db.collection('users').insertOne({
              name: profile.name,
              email: profile.email,
              image: profile.picture,
              role: 'conductor',
              status: 1, // Activo
              createdAt: new Date(),
            })
            console.log("SignIn: Success")
            return true
          } else {
            console.log("SignIn: Unauthorized, redirection to Login")
            return `/login?error=noDomain`
          }
        }
      }

      return false
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id

        const client = await clientPromise
        const db = client.db('db_unemi_parking')
        const dbUser = await db.collection('users').findOne({ email: user.email })

        if (dbUser) {
          token.role = dbUser.role
          token.status = dbUser.status
        } else {
          token.role = 'conductor'
          token.status = 0
          await db.collection('users').insertOne({
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'conductor',
            status: 0,
            createdAt: new Date(),
          })
        }

        await db.collection('sessions').insertOne({
          userId: token.id,
          sessionToken: token,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        })
      }
      return token
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        role: token.role,
        status: token.status,
      }
      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  pages: {
    signIn: '/login',
    signOut: '/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  }
})
