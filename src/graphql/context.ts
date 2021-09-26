import axios from 'axios';
import { getPosts } from './post/utils';
import { makeUserDataLoader } from './user/dataLoaders';
import { makePostDataLoader } from './post/dataLoaders';
import { getUsers } from './user/utils';

const _getUsers: any = getUsers(axios);
const _getPosts: any = getPosts(axios);

export const context = (): unknown => {
  return {
    userDataLoader: makeUserDataLoader(_getUsers),
    postDataLoader: makePostDataLoader(_getPosts),
    getUsers: _getUsers,
    getPosts: _getPosts,
  };
};
