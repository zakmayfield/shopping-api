import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import typeDefs from './typeDefs';
import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import config from './config';
import { GraphQLError } from 'graphql';

dotenv.config();

const prisma = new PrismaClient();

const resolvers = {
  Query,
  Mutation,
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

interface ContextReturn {
  db: PrismaClient
  member: any
}

const getMember = async (id) => {
  return await prisma.member.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
    }
  });
};

const auth = async (req) => {
  // let token: string
  let member = {}

  // if (req.headers && req.headers.authorization) {
  //   token = req.headers.authorization.split(' ')[1];
  
  //   const { memberId } = jwt.verify(token, config.APP_SECRET);
  
  //   if (!memberId) {
  //     throw new Error(`🚫 NO AUTH`);
  //   }
  
  //   member = await getMember(memberId);
  // }

  return {
    member,
  };
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: { req: any }): Promise<ContextReturn> => {
    const db = prisma
    
    const { member } = await auth(req)

    if (!member) {
      throw new GraphQLError(`🚫 User is not authenticated`, {
        extensions: {
          code: 'UNAUTHENTICATED',
          http: { status: 401 }
        }
      })
    }

    return { db, member }
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));