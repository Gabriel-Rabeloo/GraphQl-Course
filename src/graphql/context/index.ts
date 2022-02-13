import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

import { UsersApi } from '../schema/user/dataSources';

const get = async () => {
  return '';
};
const set = async () => {
  console.log('');
};
const deleteFn = async () => {
  return true;
};

const verifyJwtToken = async (token: string): Promise<string> => {
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET || '') as jwt.JwtPayload;

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
  if (!req || !req.headers || !req.headers.authorization) return '';

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

export const context = async ({ req, res, connection }: Context) => {
  const reqOrConnection = req || connection?.context?.req;

  let loggedUserId = await authorizeUserWithBearerToken(reqOrConnection);

  if (!loggedUserId) {
    if (reqOrConnection && reqOrConnection.headers && reqOrConnection.headers.cookie) {
      const { jwtToken } = cookieParser(reqOrConnection.headers.cookie);
      loggedUserId = await verifyJwtToken(jwtToken);
    }
  }

  const theContext: ITheContext = {
    loggedUserId,
    res,
  };

  if (connection) {
    const userApi = new UsersApi();
    userApi.initialize({
      context: {},
      cache: {
        get,
        set,
        delete: deleteFn,
      },
    });

    theContext.dataSources = {
      userApi,
    };
  }

  return theContext;
};

interface ITheContext {
  loggedUserId: string;
  res: Response;
  dataSources?: { userApi: UsersApi };
}

type Context = {
  req: Request;
  res: Response;
  connection: {
    context: {
      req: Request;
    };
  };
};
