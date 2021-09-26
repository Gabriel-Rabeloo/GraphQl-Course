import axios from 'axios';
import { getPosts } from './post/utils';
import { makeUserDataLoader } from './user/dataLoaders';
import { getUsers } from './user/utils';

export const context = (): unknown => {
  return {
    userDataLoader: makeUserDataLoader(getUsers(axios)),
    getUsers: getUsers(axios),
    getPosts: getPosts(axios),
  };
};
