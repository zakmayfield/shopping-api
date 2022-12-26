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
const client_1 = require("@prisma/client");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const Query_1 = require("./resolvers/Query");
const Mutation_1 = require("./resolvers/Mutation");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const prisma = new client_1.PrismaClient();
const resolvers = {
    Query: Query_1.Query,
    Mutation: Mutation_1.Mutation,
};
const server = new server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers,
});

(0, standalone_1.startStandaloneServer)(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
        // does this req come from the client? 
        // when loggin in as a member we can send a req.headers.authorization with bearer token attached and then we crack it open here
        // for example: let token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
        // if no token then throw
        // if token then auth
        const db = prisma;
        return { db, req };
    },
}).then(({ url }) => console.log(`🚀 Server running at ${url}`));