const users = async (_: string, { input }: any, { getUsers }: any) => {
  const apiFiltersInput = new URLSearchParams(input);
  const users = await getUsers('/?' + apiFiltersInput);
  return users.data;
};

const user = async (_: string, { id }: any, { getUsers }: any) => {
  const user = await getUsers('/' + id);
  return user.data;
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
