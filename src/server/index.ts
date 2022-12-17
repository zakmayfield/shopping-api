import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import prisma from '../prisma/client';
import {Query} from './resolvers/Query'
import {Mutation} from './resolvers/Mutation'
import typeDefs from './typeDefs';
import * as dotenv from 'dotenv';

dotenv.config();

const resolvers = {
  Query,
  Mutation
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
      let user = {};

      return {
        user,
      };
    },
  });

  console.log(`Server running ::: localhost:4000 :::`);
};

startServer();
