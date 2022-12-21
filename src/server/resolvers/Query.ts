import prisma from '../../prisma/client';

export const Query = {
  //MEMBER
  getMemberById: async (_parent, { id }) => {    
    const member = await prisma.member.findUnique({ 
      where: { id: Number(id)},
      include: {
        profile: true,
        
      }
    })

    if (!member) {
      throw new Error(`🚫 Member could not be found`)
    }

    return member
  },

  //PRODUCTS
  getAllProducts: async (_parent) => {
    const products = await prisma.product.findMany();

    if (!products) {
      throw new Error(`Server error`);
    }

    return products;
  },
  getProductById: async (_parent, { id }) => {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        discount: true,
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
    if (!product) {
      throw new Error(`Cannot find product`);
    }
    return product;
  },

  //HQs
  getAllHQs: async (_parent) => {
    const HQs = await prisma.hQ.findMany({
      include: {
        address: true,
        stores: true,
      },
    });

    if (!HQs) {
      throw new Error(`🚫 No HQs Found`);
    }

    return HQs;
  },

  //Stores
  getAllStores: async (_parent) => {
    const stores = await prisma.store.findMany({
      include: {
        address: true,
        hq: true,
        // products is array so i think we need to use include here to grab the Object Type
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!stores) {
      throw new Error(`🚫 No stores found`);
    }

    return stores;
  },
  getStoreById: async (_parent, { id }) => {
    const store = await prisma.store.findUnique({
      where: { id: Number(id) },
      include: {
        address: true,
        hq: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!store) {
      throw new Error(`🚫 Cannot locate store`);
    }

    return store;
  },
};
