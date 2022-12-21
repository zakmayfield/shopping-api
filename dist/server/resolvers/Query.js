"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
exports.Query = {
    // ::: MEMBER ::: +
    getMemberById: async (_parent, { id }, context) => {
        const member = await context.db.member.findUnique({
            where: { id: Number(id) },
            include: {
                profile: true,
            }
        });
        if (!member) {
            throw new Error(`🚫 Member could not be found`);
        }
        return member;
    },
    // ::: PRODUCTS ::: 
    getAllProducts: async (_parent, _args, context) => {
        const products = await context.db.product.findMany();
        if (!products) {
            throw new Error(`Server error`);
        }
        return products;
    },
    getProductById: async (_parent, { id }, context) => {
        const product = await context.db.product.findUnique({
            where: { id: Number(id) },
            include: {
                discount: true,
                categories: {
                    include: {
                        category: true,
                    },
                },
            },
        });
        if (!product) {
            throw new Error(`Cannot find product`);
        }
        return product;
    },
    // ::: HQs ::: 
    getAllHQs: async (_parent, _args, context) => {
        const HQs = await context.db.hQ.findMany({
            include: {
                address: true,
                stores: true,
            },
        });
        if (!HQs) {
            throw new Error(`🚫 No HQs Found`);
        }
        return HQs;
    },
    // ::: Stores ::: 
    getAllStores: async (_parent, _args, context) => {
        const stores = await context.db.store.findMany({
            include: {
                address: true,
                hq: true,
                // products is array so i think we need to use include here to grab the Object Type
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!stores) {
            throw new Error(`🚫 No stores found`);
        }
        return stores;
    },
    getStoreById: async (_parent, { id }, context) => {
        const store = await context.db.store.findUnique({
            where: { id: Number(id) },
            include: {
                address: true,
                hq: true,
                products: {
                    include: {
                        product: true,
                    },
                },
            },
        });
        if (!store) {
            throw new Error(`🚫 Cannot locate store`);
        }
        return store;
    },
};
