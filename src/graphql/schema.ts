import { gql } from 'apollo-server';
import { apiFiltersResolvers } from './api-filters/resolvers';
import { apiFiltersTypeDefs } from './api-filters/typedefs';
import { loginResolvers } from './login/resolvers';
import { loginTypedefs } from './login/typedefs';
import { postResolvers } from './post/resolvers';
import { postTypeDefs } from './post/typedefs';
import { userResolvers } from './user/resolvers';
import { userTypeDefs } from './user/typedefs';

const rootTypeDefs = gql`
  type Query {
    _empty: Boolean
  }
  type Mutation {
    _empty: Boolean
  }
`;

const rootResolvers = {
  Query: {
    _empty: (): boolean => true,
  },

  Mutation: {
    _empty: (): boolean => true,
  },
};

export const typeDefs = [rootTypeDefs, userTypeDefs, postTypeDefs, apiFiltersTypeDefs, loginTypedefs];
export const resolvers = [rootResolvers, userResolvers, postResolvers, apiFiltersResolvers, loginResolvers];
