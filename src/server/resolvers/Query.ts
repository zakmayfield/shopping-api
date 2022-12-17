import prisma from '../../prisma/client';

export const Query = {
  getAllProducts: async (_parent, args, context) => {
    const user = context.req.user;

    console.log(user);
    console.log(context.req.user);

    const products = await prisma.product.findMany();

    if (!products) {
      throw new Error(`Server error`);
    }

    return products;
  },
  getProductWithDiscountById: async (_parent, args) => {
    const { input } = args;
    const product = await prisma.product.findUnique({
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
