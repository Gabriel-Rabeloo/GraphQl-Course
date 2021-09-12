import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const context = (): unknown => {
  return {
    getUsers: (path = '/') => {
      axios(`${API_URL}/users${path}`);
    },
    getPosts: (path = '/') => {
      axios(`${API_URL}/posts${path}`);
    },
  };
};
