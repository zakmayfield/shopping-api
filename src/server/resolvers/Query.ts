import prisma from '../../prisma/client';

export const Query = {
  getAllProducts: async (_parent, args, context) => {

    const user = context.req.user

    console.log(user)
    console.log(context.req.user)
    
    const products = await prisma.product.findMany();
    
    if (!products) {
      throw new Error(`Server error`);
    }

    return products;
  },
};