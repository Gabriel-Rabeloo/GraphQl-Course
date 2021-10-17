import jwt from 'jsonwebtoken';
import { UsersApi } from './user/dataSources';

const authorizeUser = async (req: Request) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const token = authorization.split(' ')[1];
    const response = jwt.verify(token, process.env.JWT_SECRET || '');
    if (typeof response !== 'string') {
      const { userId } = response;
      const get = async () => {
        return '';
      };
      const set = async () => {
        console.log('');
      };
      const deleteFn = async () => {
        return true;
      };

      const userApi = new UsersApi();
      userApi.initialize({
        context: {},
        cache: {
          get,
          set,
          delete: deleteFn,
        },
      });
      const foundUser = await userApi.getUser(userId);

      if (foundUser.token !== token) return '';
      return userId;
    }
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const context = async ({ req }: Context) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
  };
};

type Context = {
  req: Request;
};

type Request = {
  headers: {
    authorization: string;
  };
};
