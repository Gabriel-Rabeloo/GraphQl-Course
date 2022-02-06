/* eslint-disable no-unused-vars */
import { URLSearchParamsInit } from 'apollo-server-env';
import { CommentSQLDataSource } from '../graphql/schema/comment/datasources';

import { LoginApi } from '../graphql/schema/login/dataSources';
import { PostsApi } from '../graphql/schema/post/dataSources';
import { UsersApi } from '../graphql/schema/user/dataSources';

/* eslint-disable @typescript-eslint/ban-types */
export type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  indexRef: number;
  passwordHash: string;
  createdAt: string;
  token: string;
};

export type Post = {
  id: string;
  title: string;
  body: string;
  indexRef: string;
  createdAt: string;
  unixTimestamp: string;
  userId: string;
};

export type Comment = {
  id: string;
  comment: string;
  userId: string;
  postId: string;
  indexRef: string;
  createdAt: string;
};

export type DbComment = {
  id: string;
  comment: string;
  post_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
};

export type CreateCommentInput = {
  comment: string;
  postId: string;
};

export type params = {
  input: string;
  id: string;
};

export type Error = {
  statusCode: number;
  message: string;
  postId?: string;
  userId?: string;
  timeout?: number;
};

export interface DataSources {
  get: (path: string, params?: URLSearchParamsInit | undefined, init?: RequestInit | undefined) => Promise<any>;
  patch: (path: string, body?: Body | undefined, init?: RequestInit | undefined) => Promise<any>;
  delete: (path: string, params?: URLSearchParamsInit | undefined, init?: RequestInit | undefined) => Promise<any>;

  dataSources: {
    postApi: PostsApi;
    userApi: UsersApi;
    loginApi: LoginApi;
    commentDb: CommentSQLDataSource;
  };
}

export interface Context {
  dataSources: {
    postApi: PostsApi;
    userApi: UsersApi;
    loginApi: LoginApi;
    commentDb: CommentSQLDataSource;
  };
  loggedUserId: string;
}

export type InputPost = {
  title: string;
  body: string;
  userId: string;
};

export type InputUser = {
  fistName: string;
  lastName: string;
  userName: string;
};

export type InputLogin = {
  data: {
    userName: string;
    password: string;
  };
};
