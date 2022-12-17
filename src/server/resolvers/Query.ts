import prisma from '../../prisma/client';

export const Query = {
  getAllProducts: async () => {
    const products = await prisma.product.findMany();

    if (!products) {
      throw new Error(`Server error`);
    }

    return products;
  },
};