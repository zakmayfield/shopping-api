"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
    type Query {
        getAllProducts: [Product!]!
        getProductWithDiscountById(input: ProductById!): ProductWithDiscount!
    }

    type Mutation {
        toggleActiveDiscount(input: DiscountToggle): Discount
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

    type ProductWithDiscount {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        description: String
        price: String
        isDiscountActive: Boolean!
        discount: Discount
    }

    type Discount {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        description: String
        expiresIn: String
        percent: Int
        isActive: Boolean
    }

    input ProductInput {
        name: String!
        price: String
        description: String
    }

    input ProductById {
        productId: Int!
    }

    input DiscountToggle {
        discountId: Int!
    }
`;
exports.default = typeDefs;
