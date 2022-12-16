"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const client_1 = __importDefault(require("../prisma/client"));
const dotenv = __importStar(require("dotenv"));
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
            const products = await client_1.default.product.findMany();
            if (!products) {
                throw new Error(`Server error`);
            }
            return products;
        },
    },
    Mutation: {
        toggleProductDiscount: async (_parent, args) => {
            const { input } = args;
            const id = input.productId;
            const product = await client_1.default.product.findUnique({ where: { id } });
            if (!product) {
                throw new Error(`No product to update`);
            }
            const updatedProduct = await client_1.default.product.update({
                where: { id },
                data: {
                    isDiscountActive: !product.isDiscountActive
                }
            });
            return updatedProduct;
        },
    },
};
const server = new server_1.ApolloServer({
    typeDefs,
    resolvers,
});
const startServer = async () => {
    await (0, standalone_1.startStandaloneServer)(server, {
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
