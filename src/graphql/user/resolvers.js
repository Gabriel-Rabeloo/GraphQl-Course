const users = () => {
  return [
    {
      id: '1',
      userName: 'gabriel',
    },

    {
      id: '2',
      userName: 'gabriel2',
    },
  ];
};

const user = () => {
  return {
    id: '1',
    userName: 'gabriel',
  };
};

export const userResolvers = {
  Query: {
    user,
    users,
  },
};
