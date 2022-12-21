"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mutation = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken = (id) => jsonwebtoken_1.default.sign({ userId: id }, config_1.default.APP_SECRET, { expiresIn: '2d' });
exports.Mutation = {
    //MEMBER
    registerMember: async (_parent, args, context) => {
        const { email, password } = args.input;
        const checkIfEmailExists = await client_1.default.member.findUnique({ where: { email } });
        if (checkIfEmailExists) {
            throw new Error(`🚫 Email already registered`);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const createdMember = await client_1.default.member.create({
            data: {
                email,
                password: hashedPassword
            }
        });
        const validMember = {
            ...createdMember,
            token: generateToken(createdMember.id)
        };
        context.req.member = {
            id: validMember.id,
            token: validMember.token
        };
        console.log('context', context.req.member);
        return validMember;
    },
    loginMember: async (_parent, { input }, context) => {
        const { email, password } = input;
        const member = await client_1.default.member.findUnique({
            where: {
                email
            },
        });
        if (!member) {
            throw new Error(`🚫 EMAIL DOES NOT EXIST :::`);
        }
        const valid = await bcrypt_1.default.compare(password, member.password);
        if (!valid)
            throw new Error(`🚫 Invalid Password`);
        const validMember = {
            ...member,
            token: generateToken(member.id)
        };
        // @context-debugging
        // my theory here is that i can set context.member to be equal to an object upon login
        // then any hits to context thereafter will produce 
        // context.member = {
        //   id: validMember.id,
        //   token: validMember.token
        // };
        console.log('context', context);
        return validMember;
    },
    toggleActiveDiscount: async (_parent, { id }) => {
        const discount = await client_1.default.discount.findUnique({ where: { id: Number(id) } });
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
