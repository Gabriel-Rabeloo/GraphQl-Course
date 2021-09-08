import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const context = () => {
  return {
    getUsers: (path = '/') => axios(`${API_URL}/users${path}`),
    getPosts: (path = '/') => axios(`${API_URL}/posts${path}`),
  };
};

async function nada() {
  const a = await axios(`${API_URL}/users`)
  console.log(a.data)
}
console.log(nada())
