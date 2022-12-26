import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { Query } from './resolvers/Query';
import { Mutation } from './resolvers/Mutation';
import typeDefs from './typeDefs';
import * as dotenv from 'dotenv';

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
}

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: { req: any }): Promise<ContextReturn> => {
    // does this req come from the client? 
    // when loggin in as a member we can send a req.headers.authorization with bearer token attached and then we crack it open here
    // for example: let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    // if no token then throw
    // if token then auth
    const db = prisma

    return { db }
  },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));