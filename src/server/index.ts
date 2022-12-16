import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import prisma from '../prisma/client';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const typeDefs = `#graphql
    type Query {
        getAllProducts: [Product!]!
    }

    type Mutation {
        toggleProductDiscount(input: ProductDiscountToggle): Product
    }
    
    type Product {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        description: String
        price: String
        isDiscountActive: Boolean!
    }

    input ProductInput {
        name: String!
        price: String
        description: String
    }

    input ProductDiscountToggle {
        productId: Int!
    }
`;

const resolvers = {
  Query: {
    getAllProducts: async () => {
      const products = await prisma.product.findMany();

      if (!products) {
        throw new Error(`Server error`);
      }

      return products;
    },
  },
  Mutation: {
    toggleProductDiscount: async (_parent, args) => {
        const {input} = args
        const id = input.productId
        const product = await prisma.product.findUnique({where: { id }})

        if (!product) {
            throw new Error(`No product to update`)
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                isDiscountActive: !product.isDiscountActive
            }
        })

        return updatedProduct
    },
  },
};

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
