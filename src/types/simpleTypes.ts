/* eslint-disable @typescript-eslint/ban-types */
export type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  indexRef: number;
  createdAt: string;
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

export type params = {
  input?: string;
  id?: string;
};

export type Error = {
  statusCode: number;
  message: string;
  postId?: string;
  userId?: string;
  timeout?: number;
};

export type DataSources = {
  get: Function;
  dataSources: {
    postApi: PostApi;
    userApi: UserApi;
  };
};

interface PostApi {
  get: Function;
  getPost: Function;
  getPosts: Function;
  batchLoadByUserId: Function;
  createPost: Function;
  dataLoader: {
    load: Function;
  };
}

interface UserApi {
  get: Function;
  getUser: Function;
  getUsers: Function;
  batchLoadByUserId: Function;
  dataLoader: {
    load: Function;
  };
}

export type InputPost = {
  title: string;
  body: string;
  userId: string;
};
