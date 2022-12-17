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
};
