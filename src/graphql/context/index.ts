import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { UsersApi } from '../schema/user/dataSources';

const verifyJwtToken = async (token: string): Promise<string> => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;

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

const authorizeUserWithBearerToken = async (req: Request): Promise<string> => {
  const { headers } = req;
  const { authorization } = headers;

  if (typeof authorization !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_bearer, token] = authorization.split(' ');
    return await verifyJwtToken(token);
  }
  return '';
};

const cookieParser = (cookiesHeader: string) => {
  // The final goal is to return an object with key/value reflecting
  // the cookies. So, this functions always returns an object.

  // If we do not receive a string, we won't do anything.
  if (typeof cookiesHeader != 'string') return {};

  const cookies = cookiesHeader.split(/;\s*/);

  // If we have something similar to cookie, we want to add them
  // to the final object
  const parsedCookie: any = {};
  for (let i = 0; i < cookies.length; i++) {
    const [key, value] = cookies[i].split('=');
    parsedCookie[key] = value;
  }

  // The reason I'm using JSON here is to make sure the final
  // object won't have any undefined value.
  return JSON.parse(JSON.stringify(parsedCookie));
};

export const context = async ({ req, res }: Context) => {
  let loggedUserId = await authorizeUserWithBearerToken(req);

  if (!loggedUserId) {
    if (req.headers.cookie) {
      const { jwtToken } = cookieParser(req.headers.cookie);
      loggedUserId = await verifyJwtToken(jwtToken);
    }
  }

  return {
    loggedUserId,
    res,
  };
};

type Context = {
  req: Request;
  res: Response;
};
