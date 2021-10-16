/* eslint-disable @typescript-eslint/ban-types */
export type User = {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  indexRef: number;
  passwordHash: string;
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
  patch: Function;
  delete: Function;

  dataSources: {
    postApi: PostApi;
    userApi: UserApi;
    loginApi: LoginApi;
  };
};

export type Context = {
  dataSources: {
    postApi: PostApi;
    userApi: UserApi;
    loginApi: LoginApi;
  };
  loggedUserId: string;
};

interface PostApi {
  get: Function;
  getPost: Function;
  getPosts: Function;
  updatePost: Function;
  deletePost: Function;
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
  updateUser: Function;
  deleteUser: Function;
  batchLoadByUserId: Function;
  createUser: Function;
  dataLoader: {
    load: Function;
  };
}

interface LoginApi {
  login: Function;
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
