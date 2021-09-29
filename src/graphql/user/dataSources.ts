import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';
import { makeUserDataLoader } from './dataLoaders';

export class UsersApi extends RESTDataSource {
  dataLoader: any;
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
    this.dataLoader = makeUserDataLoader(this.getUsers.bind(this));
  }

  async getUsers(urlParams: URLSearchParamsInit = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getUser(id: string) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  batchLoadByUserId(id: string) {
    return this.dataLoader.load(id);
  }
}
