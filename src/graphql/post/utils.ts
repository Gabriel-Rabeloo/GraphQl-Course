/* eslint-disable prettier/prettier */
export const getPosts = (axios: any) => (path = '/') => {
  return axios(`${process.env.API_URL}/posts${path}`);
};
