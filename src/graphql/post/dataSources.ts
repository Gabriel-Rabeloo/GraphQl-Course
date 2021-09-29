import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';

export class PostsApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
  }

  async getPosts(urlParams: URLSearchParamsInit = {}) {
    return this.get('', urlParams);
  }

  async getPost(id: string) {
    return this.get(id);
  }
}
