import DataLoader from 'dataloader';
import axios from 'axios';

import { Error } from '../../types/errorType';
import { params } from '../../types/paramsType';
import { Post } from '../../types/postType';
import { User } from '../../types/userType';

const post = async (
  _: string,
  { id }: params,
  { getPosts }: any,
): Promise<Post | Error> => {
  const post = await getPosts('/' + id);
  return post.data;
};

const posts = async (
  _: string,
  { input }: params,
  { getPosts }: any,
): Promise<[Post]> => {
  const apiFiltersInput = new URLSearchParams(input);
  const posts = await getPosts('/?' + apiFiltersInput);
  return posts.data;
};

const userDataLoader = new DataLoader(async (ids: any): Promise<string> => {
  const urlQuery = ids.join('&id=');
  const url = 'http://localhost:3000/users/?id=' + urlQuery;
  const response = await axios(url);
  const users: [User] = response.data;
  return ids.map((id: string) => users.find((user) => user.id === id));
});

const user = async ({ userId }: Post) => {
  return userDataLoader.load(userId);
};

export const postResolvers = {
  Query: { post, posts },
  Post: { user },
};
