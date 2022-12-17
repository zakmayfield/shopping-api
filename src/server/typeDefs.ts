const typeDefs = `#graphql
    type Query {
        getAllProducts: [Product!]!
        getProductWithDiscountById(input: ProductById!): ProductWithDiscount!
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

    input ProductDiscountToggle {
        productId: Int!
    }

    input ProductById {
        productId: Int!
    }
`;

export default typeDefs;