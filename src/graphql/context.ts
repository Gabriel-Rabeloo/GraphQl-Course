import jwt from 'jsonwebtoken';

const authorizeUser = (req: Request) => {
  const { headers } = req;
  const { authorization } = headers;

  try {
    const token = authorization.split(' ')[1];
    const response = jwt.verify(token, process.env.JWT_SECRET || '');
    if (typeof response !== 'string') {
      const { userId } = response;
      return userId;
    }
  } catch (error) {
    return '';
  }
};

export const context = ({ req }: Context) => {
  const loggedUserId = authorizeUser(req);

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
