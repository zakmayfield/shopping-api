import jwt from 'jsonwebtoken'
import config from '../config'
import bcrypt from 'bcrypt'

const generateToken = (id: number) =>
  jwt.sign({ userId: id }, config.APP_SECRET, { expiresIn: '2d' });

export const Mutation = {
  // ::: MEMBER :::
  registerMember: async (_parent, args, context) => {
    const { email, password } = args.input;

    const checkIfEmailExists = await context.db.member.findUnique({
      where: { email },
    });

    if (checkIfEmailExists) {
      throw new Error(`🚫 Email already registered`)
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const createdMember = await context.db.member.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const validMember = {
      ...createdMember,
      token: generateToken(createdMember.id)
    };

    context.req.member = {
      id: validMember.id,
      token: validMember.token
    }

   console.log('context', context.req.member)

    return validMember;
  },

  loginMember: async (_parent, { input }, context) => {
    const { email, password } = input

    const member = await context.db.member.findUnique({
      where: {
        email,
      },
    });

    if (!member) {
      throw new Error(`🚫 EMAIL DOES NOT EXIST :::`);
    }

    const valid = await bcrypt.compare(password, member.password);

    if (!valid) throw new Error(`🚫 Invalid Password`);

    const validMember = {
      ...member,
      token: generateToken(member.id)
    }

    return validMember
  },

  // ::: DISCOUNT :::
  toggleActiveDiscount: async (_parent, { id }, context) => {
    const discount = await context.db.discount.findUnique({
      where: { id: Number(id) },
    });

    if (!discount) {
      throw new Error(`Cannot locate discount`);
    }

    const updatedDiscount = await context.db.discount.update({
      where: { id },
      data: {
        isActive: !discount.isActive,
      },
    });

    return updatedDiscount;
  },
};
