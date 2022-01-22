import { Context, DataSources, InputLogin } from '../../types/simpleTypes';

export const login = async (
  _: undefined,
  { data }: InputLogin,
  { dataSources }: DataSources,
) => {
  const { userName, password } = data;
  return dataSources.loginApi.login(userName, password);
};

export const logout = async (
  _: undefined,
  { userName }: { userName: string },
  { dataSources }: Context,
) => {
  return dataSources.loginApi.logout(userName);
};

export const loginResolvers = {
  Mutation: {
    login,
    logout,
  },
};
