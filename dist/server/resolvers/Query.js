"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.Query = {
    getAllProducts: async (_parent, args, context) => {
        const user = context.req.user;
        console.log(user);
        console.log(context.req.user);
        const products = await client_1.default.product.findMany();
        if (!products) {
            throw new Error(`Server error`);
        }
        return products;
    },
    getProductWithDiscountById: async (_parent, args) => {
        const { input } = args;
        const product = await client_1.default.product.findUnique({
            where: { id: input.productId },
            include: {
                discount: true,
                categorys: true,
            },
        });
        if (!product) {
            throw new Error(`Cannot find product`);
        }
        return product;
    },
    //HQs
    getAllHQs: async (_parent, arg) => {
        const HQs = await client_1.default.hQ.findMany({
            include: {
                address: true,
                stores: true
            }
        });
        if (!HQs) {
            throw new Error(`🚫 No HQs Found`);
        }
        return HQs;
    },
    //Stores
    getAllStores: async (_parent, args) => {
        const stores = await client_1.default.store.findMany({
            include: {
                address: true,
                hq: true,
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!stores) {
            throw new Error(`🚫 No stores found`);
        }
        return stores;
    }
};
