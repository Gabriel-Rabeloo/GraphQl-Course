import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';
import { InputPost } from '../../types/simpleTypes';
import { makePostDataLoader } from './dataLoaders';
import { createPostFn } from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  dataLoader: any;
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams: URLSearchParamsInit = {}) {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 60 },
    });
  }

  async getPost(id: string) {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 60 },
    });
  }

  async createPost(postData: InputPost) {
    return createPostFn(postData, this);
  }

  batchLoadByUserId(id: string) {
    return this.dataLoader.load(id);
  }
}
