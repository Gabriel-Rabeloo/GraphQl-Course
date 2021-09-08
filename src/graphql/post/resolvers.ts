const post = async (_: string, { id }: any, { getPosts }: any) => {
  const response = await getPosts('/' + id);
  return response.data;
};

const posts = async (_: string, { input }: any, { getPosts }: any) => {
  const apiFiltersInput = new URLSearchParams(input);
  const response = await getPosts('/?' + apiFiltersInput);
  return response.data;
};

export const postResolvers = {
  Query: { post, posts },
  Post: {
    unixTimestamp: ({ createdAt }: any) => {
      const timestamp = new Date(createdAt).getTime() / 1000;
      return Math.floor(timestamp);
    },
  },
};
