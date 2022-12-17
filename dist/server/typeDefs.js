"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = typeDefs;
