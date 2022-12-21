const typeDefs = `#graphql
    type Query {
        # ::: MEMBER :::

        # ::: PRODUCTS :::
        getAllProducts: [Product!]!
        getProductById(id: ID!): Product!

        # HQ queries
        getAllHQs: [HQ!]!

        # Store query
        getAllStores: [Store!]!
        getStoreById(id: ID!): Store
    }

    type Mutation {
        # ::: MEMBER :::
        registerMember(input: RegisterMember!): Member!

        # ::: DISCOUNT :::
        toggleActiveDiscount(id: ID!): Discount
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
        categories: [CategoriesOnProducts]
    }

    type CategoriesOnProducts {
        product: Product!
        productId: Int!
        category: ProductCategory!
        categoryId: Int!
    }

    type ProductsOnStores {
        product: Product
        productId: Int
        store: Store
        storeId: Int
        quantity: Int
    }

    type ProductCategory {
        id: ID!
        createdAt: String
        updatedAt: String
        name: String!
        code: String
        discount: Discount
        discountId: Int
        products: [CategoriesOnProducts]
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

    type Member {
        id: ID!
        createdAt: String
        updatedAt: String
        email: String!
        password: String!
        token: String
        profile: MemberProfile
        payments: [MemberPayment]!
        billingAddresses: [MemberBillingAddress]!
        shippingAddresses: [MemberShippingAddress]!
    }

    input RegisterMember {
        email: String!
        password: String!
    }

    type MemberProfile {
        id: ID!
        createdAt: String
        updatedAt: String
        username: String!
        firstName: String
        lastName: String
        points: Int
        #cart: Cart
        member: Member!
        memberId: Int!
    }

    type MemberPayment {
        id: ID!
        createdAt: String
        updatedAt: String
        provider: String!
        nameOnCard: String!
        cardNumber: Int
        expirationDate: String!
        cvv: Int
        member: Member
        memberId: Int
    }

    type MemberBillingAddress {
        id: ID!
        createdAt: String
        updatedAt: String
        address: String!
        apartment: String
        city: String!
        state: String!
        zip: String!
        member: Member!
        memberId: Int!
    }

    type MemberShippingAddress {
        id: ID!
        createdAt: String
        updatedAt: String
        address: String!
        apartment: String
        city: String!
        state: String!
        zip: String!
        member: Member!
        memberId: Int!
    }

    input ProductInput {
        name: String!
        price: String
        description: String
    }
`;

export default typeDefs;