import { PubSub, withFilter } from 'apollo-server';

import { Context, CreateComment, CreateCommentInput } from '../../../interfaces/simpleTypes';
import { checkIsLoggedIn } from '../login/utils/validate';

export const pubSub = new PubSub();
export const CREATED_COMMENT_TRIGGER = 'createdComment';

const createComment = async (
  _: unknown,
  { data }: { data: CreateCommentInput },
  { dataSources, loggedUserId }: Context,
) => {
  checkIsLoggedIn(loggedUserId);
  const { postId, comment } = data;

  const post = await dataSources.postApi.getPost(postId); // throws if post does not exist

  return dataSources.commentDb.create({ postId, comment, userId: loggedUserId, postOwner: post?.userId || null });
};

const user = async ({ userId }: { userId: string }, _: unknown, { dataSources }: Context) => {
  console.log('data sources', dataSources);
  const user = await dataSources.userApi.batchLoadByUserId(userId);
  return user;
};

const createdComment = {
  subscribe: withFilter(
    () => {
      return pubSub.asyncIterator(CREATED_COMMENT_TRIGGER);
    },
    (payload: CreateComment, _variable: unknown, context: Context) => {
      const hasPostOwner = payload.postOwner && payload.postOwner !== null;
      const postOwnerIsLoggedUser = payload.postOwner === context.loggedUserId;
      const shouldNotifyUser = !!hasPostOwner && !!postOwnerIsLoggedUser;
      return shouldNotifyUser;
    },
  ),
};

export const commentResolvers = {
  Mutation: { createComment },
  Subscription: { createdComment },
  Comment: { user },
};
