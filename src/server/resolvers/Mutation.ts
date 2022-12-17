import prisma from '../../prisma/client';

export const Mutation = {
  toggleActiveDiscount: async (_parent, args) => {
    const { input } = args;
    const id = input.discountId;
    const discount = await prisma.discount.findUnique({ where: { id } });

    if (!discount) {
      throw new Error(`Cannot locate discount`);
    }

    const updatedDiscount = await prisma.discount.update({
      where: { id },
      data: {
        isActive: !discount.isActive,
      },
    });

    return updatedDiscount;
  },
};
