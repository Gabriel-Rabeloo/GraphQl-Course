import jwt from 'jsonwebtoken';
import { UsersApi } from './user/dataSources';

const authorizeUser = async (req: Request): Promise<string> => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const token = authorization.split(' ')[1];
    const response = jwt.verify(
      token,
      process.env.JWT_SECRET || '',
    ) as jwt.JwtPayload;

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
    return userId as string;
  } catch (error) {
    console.error(error);
    return '';
  }
};

export const context = async ({ req, res }: Context) => {
  const loggedUserId = await authorizeUser(req);

  return {
    loggedUserId,
    res,
  };
};

type Context = {
  req: Request;
  res: Express.Response;
};

type Request = {
  headers: {
    authorization: string;
  };
};
