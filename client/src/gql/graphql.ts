/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CategoriesOnProducts = {
  __typename?: 'CategoriesOnProducts';
  category: ProductCategory;
  categoryId: Scalars['Int'];
  product: Product;
  productId: Scalars['Int'];
};

export type Discount = {
  __typename?: 'Discount';
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  expiresIn?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isActive?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  percent?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Hq = {
  __typename?: 'HQ';
  address: HqAddress;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  stores?: Maybe<Array<Maybe<Store>>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type HqAddress = {
  __typename?: 'HQAddress';
  address: Scalars['String'];
  apartment?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  hq?: Maybe<Hq>;
  hqId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  stateOrProvince: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  zip: Scalars['Int'];
};

export type LoginMember = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Member = {
  __typename?: 'Member';
  billingAddresses: Array<Maybe<MemberBillingAddress>>;
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id: Scalars['ID'];
  password: Scalars['String'];
  payments: Array<Maybe<MemberPayment>>;
  profile?: Maybe<MemberProfile>;
  shippingAddresses: Array<Maybe<MemberShippingAddress>>;
  token?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type MemberBillingAddress = {
  __typename?: 'MemberBillingAddress';
  address: Scalars['String'];
  apartment?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  member: Member;
  memberId: Scalars['Int'];
  state: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type MemberPayment = {
  __typename?: 'MemberPayment';
  cardNumber: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  cvv?: Maybe<Scalars['Int']>;
  expirationDate: Scalars['String'];
  id: Scalars['ID'];
  member?: Maybe<Member>;
  memberId?: Maybe<Scalars['Int']>;
  nameOnCard: Scalars['String'];
  provider: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type MemberProfile = {
  __typename?: 'MemberProfile';
  createdAt?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  member: Member;
  memberId: Scalars['Int'];
  points?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type MemberShippingAddress = {
  __typename?: 'MemberShippingAddress';
  address: Scalars['String'];
  apartment?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  member: Member;
  memberId: Scalars['Int'];
  state: Scalars['String'];
  updatedAt?: Maybe<Scalars['String']>;
  zip: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginMember: Member;
  registerMember: Member;
  toggleActiveDiscount?: Maybe<Discount>;
};


export type MutationLoginMemberArgs = {
  input: LoginMember;
};


export type MutationRegisterMemberArgs = {
  input: RegisterMember;
};


export type MutationToggleActiveDiscountArgs = {
  id: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  categories?: Maybe<Array<Maybe<CategoriesOnProducts>>>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discount?: Maybe<Discount>;
  id: Scalars['ID'];
  isDiscountActive: Scalars['Boolean'];
  name: Scalars['String'];
  price?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  discount?: Maybe<Discount>;
  discountId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  products?: Maybe<Array<Maybe<CategoriesOnProducts>>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ProductInput = {
  description?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  price?: InputMaybe<Scalars['String']>;
};

export type ProductsOnStores = {
  __typename?: 'ProductsOnStores';
  product?: Maybe<Product>;
  productId?: Maybe<Scalars['Int']>;
  quantity?: Maybe<Scalars['Int']>;
  store?: Maybe<Store>;
  storeId?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  getAllHQs: Array<Hq>;
  getAllProducts: Array<Product>;
  getAllStores: Array<Store>;
  getMemberById: Member;
  getProductById: Product;
  getStoreById?: Maybe<Store>;
};


export type QueryGetMemberByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetProductByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetStoreByIdArgs = {
  id: Scalars['ID'];
};

export type RegisterMember = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Store = {
  __typename?: 'Store';
  address?: Maybe<StoreAddress>;
  createdAt?: Maybe<Scalars['String']>;
  hq?: Maybe<Hq>;
  hqId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  products: Array<Maybe<ProductsOnStores>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type StoreAddress = {
  __typename?: 'StoreAddress';
  address: Scalars['String'];
  apartment?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  stateOrProvince: Scalars['String'];
  store?: Maybe<Store>;
  storeId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['String']>;
  zip: Scalars['Int'];
};

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: Array<{ __typename?: 'Product', id: string, name: string, description?: string | null, price?: number | null }> };


export const GetAllProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllProducts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"price"}}]}}]}}]} as unknown as DocumentNode<GetAllProductsQuery, GetAllProductsQueryVariables>;