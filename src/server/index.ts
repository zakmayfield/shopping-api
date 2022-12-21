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

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }: { req: any }): Promise<{ db: PrismaClient }> => ({
    db: prisma
  }),
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));