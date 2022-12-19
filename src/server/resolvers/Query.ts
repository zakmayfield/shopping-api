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

  //HQs
  getAllHQs: async (_parent, arg) => {
    const HQs = await prisma.hQ.findMany({
      include: {
        address: true,
        stores: true
      }
    })

    if (!HQs) {
      throw new Error(`🚫 No HQs Found`)
    }

    return HQs
  },

  //Stores
  getAllStores: async (_parent, args) => {
    const stores = await prisma.store.findMany({
      include: {
        address: true,
        hq: true,
        // products is array so i think we need to use include here to grab the Object Type
        products: {
          include: {
            product: true
          }
        }
      }
    })

    if (!stores) {
      throw new Error(`🚫 No stores found`)
    }

    return stores
  }
};
