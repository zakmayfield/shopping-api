"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.Mutation = {
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
};
