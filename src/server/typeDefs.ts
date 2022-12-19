const typeDefs = `#graphql
    type Query {
        getAllProducts: [Product!]!
        getProductWithDiscountById(input: ProductById!): Product!

        # HQ queries
        getAllHQs: [HQ!]!

        # Store query
        getAllStores: [Store!]!
    }

    type Mutation {
        toggleActiveDiscount(input: DiscountToggle): Discount
    }

    type HQ {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        address: HQAddress!
        stores: [Store]
    }

    type HQAddress {
        id: ID!
        createdAt: String
        updatedAt: String
        address: String!
        apartment: String
        city: String!
        stateOrProvince: String!
        zip: Int!
        country: String!
        hq: HQ
        hqId: Int
    }

    type Store {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        address: StoreAddress
        hq: HQ
        hqId: Int
        products: [ProductsOnStores]!
    }

    type StoreAddress {
        id: ID!
        createdAt: String
        updatedAt: String
        address: String!
        apartment: String
        city: String!
        stateOrProvince: String!
        zip: Int!
        country: String!
        store: Store
        storeId: Int
    }

    type Product {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        description: String
        price: Int
        isDiscountActive: Boolean!
        discount: Discount
    }

    type ProductsOnStores {
        product: Product
        productId: Int
        store: Store
        storeId: Int
        quantity: Int
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

export default typeDefs;