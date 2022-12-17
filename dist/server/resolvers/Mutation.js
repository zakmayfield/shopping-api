"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.Mutation = {
    toggleActiveDiscount: async (_parent, args) => {
        const { input } = args;
        const id = input.discountId;
        const discount = await client_1.default.discount.findUnique({ where: { id } });
        if (!discount) {
            throw new Error(`Cannot locate discount`);
        }
        const updatedDiscount = await client_1.default.discount.update({
            where: { id },
            data: {
                isActive: !discount.isActive,
            },
        });
        return updatedDiscount;
    },
};
