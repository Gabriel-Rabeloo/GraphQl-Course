/* eslint-disable prettier/prettier */
export const getUsers = (axios: any) => (path = '/') => {
  return axios(`${process.env.API_URL}/users${path}`);
};
