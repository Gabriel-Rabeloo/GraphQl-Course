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
  dataSources: {
    postApi: {
      getPost: Function;
      getPosts: Function;
    };
  };
};
