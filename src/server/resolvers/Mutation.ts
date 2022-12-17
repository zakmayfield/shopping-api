import prisma from '../../prisma/client'

export const Mutation = {
    toggleProductDiscount: async (_parent, args) => {
        const {input} = args
        const id = input.productId
        const product = await prisma.product.findUnique({where: { id }})

        if (!product) {
            throw new Error(`No product to update`)
        }

        const updatedProduct = await prisma.product.update({
            where: { id },
            data: {
                isDiscountActive: !product.isDiscountActive
            }
        })

        return updatedProduct
    },
};