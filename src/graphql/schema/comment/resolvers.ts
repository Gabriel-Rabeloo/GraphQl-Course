import { Context, CreateCommentInput } from '../../../interfaces/simpleTypes';
import { checkIsLoggedIn } from '../login/utils/validate';

const createComment = async (
  _: unknown,
  { data }: { data: CreateCommentInput },
  { dataSources, loggedUserId }: Context,
) => {
  checkIsLoggedIn(loggedUserId);
  const { postId, comment } = data;

  await dataSources.postApi.getPost(postId); // throws if post does not exist

  return dataSources.commentDb.create({ postId, comment, userId: loggedUserId });
};

const user = async ({ userId }: { userId: string }, _: unknown, { dataSources }: Context) => {
  const user = await dataSources.userApi.batchLoadByUserId(userId);
  return user;
};

export const commentResolvers = {
  Mutation: { createComment },
  Comment: { user },
};
