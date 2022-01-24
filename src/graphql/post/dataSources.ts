import { RESTDataSource } from 'apollo-datasource-rest';
import { URLSearchParamsInit } from 'apollo-server-env';
import { InputPost, Post } from '../../interfaces/simpleTypes';
import { makePostDataLoader } from './dataLoaders';
import { createPostFn, deletePostFn, updatePostFn } from './utils/post-repository';

export class PostsApi extends RESTDataSource {
  dataLoader: any;
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/posts/';
    this.dataLoader = makePostDataLoader(this.getPosts.bind(this));
  }

  async getPosts(urlParams: URLSearchParamsInit = {}): Promise<Post[]> {
    return this.get('', urlParams, {
      cacheOptions: { ttl: 0 },
    });
  }

  async getPost(id: string): Promise<Post> {
    return this.get(id, undefined, {
      cacheOptions: { ttl: 0 },
    });
  }

  async createPost(postData: InputPost) {
    return createPostFn(postData, this);
  }

  async updatePost(postId: string, postData: InputPost) {
    return updatePostFn(postId, postData, this);
  }

  async deletePost(postId: string) {
    return deletePostFn(postId, this);
  }

  batchLoadByUserId(id: string): Promise<Post[]> {
    return this.dataLoader.load(id);
  }
}
