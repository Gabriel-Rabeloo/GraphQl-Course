const post = () => {
  return {
    id: 'a',
    title: 'Post title 1',
  };
};

const posts = () => {
  return [
    {
      id: 'a424',
      title: 'Post title 1',
    },
    {
      id: 'a12',
      title: 'Post title 1',
    },
    {
      id: '12a',
      title: 'Post title 1',
    },
  ];
};

export const postResolvers = {
  Query: {
    post,
    posts,
  },
};
