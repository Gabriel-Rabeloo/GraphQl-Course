import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';
import { InputUser, User } from '../../interfaces/simpleTypes';
import { makeUserDataLoader } from './dataLoaders';
import { createUserFn, deleteUserFn, updateUserFn } from './utils/user-repository';

export class UsersApi extends RESTDataSource {
  dataLoader: any;
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams: URLSearchParamsInit = {}): Promise<User[]> {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getUser(id: string): Promise<User> {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  async createUser(data: InputUser) {
    return createUserFn(data, this);
  }

  async updateUser(id: string, data: InputUser) {
    return updateUserFn(id, data, this);
  }
  async deleteUser(id: string) {
    return deleteUserFn(id, this);
  }
  batchLoadByUserId(id: string): Promise<User> {
    return this.dataLoader.load(id);
  }
}
