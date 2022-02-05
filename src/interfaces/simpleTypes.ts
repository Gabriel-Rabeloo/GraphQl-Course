/* eslint-disable no-unused-vars */
import { URLSearchParamsInit } from 'apollo-server-env';

import { LoginApi } from '../graphql/login/dataSources';
import { PostsApi } from '../graphql/post/dataSources';
import { UsersApi } from '../graphql/user/dataSources';

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
  };
}

export interface Context {
  dataSources: {
    postApi: PostsApi;
    userApi: UsersApi;
    loginApi: LoginApi;
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
