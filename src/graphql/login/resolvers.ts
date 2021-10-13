import { DataSources, InputLogin } from '../../types/simpleTypes';

export const login = async (
  _: undefined,
  { data }: InputLogin,
  { dataSources }: DataSources,
) => {
  const { userName, password } = data;
  return dataSources.loginApi.login(userName, password);
};

export const loginResolvers = {
  Mutation: {
    login,
  },
};
