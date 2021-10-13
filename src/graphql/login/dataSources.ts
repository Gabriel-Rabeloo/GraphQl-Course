import bcrypt from 'bcrypt';
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';
import { User } from '../../types/simpleTypes';
import jwt from 'jsonwebtoken';

export class LoginApi extends RESTDataSource {
  dataLoader: any;
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
  }

  async login(userName: string, password: string) {
    const user: User[] = await this.get(
      '',
      { userName },
      { cacheOptions: { ttl: 0 } },
    );
    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError(
        'User does not exist or password is invalid',
      );
    }

    const { passwordHash, id: userId } = user[0];
    const isPasswordValid = await this.checkUserPassword(
      password,
      passwordHash,
    );

    if (!isPasswordValid) {
      throw new AuthenticationError(
        'User does not exist or password is invalid',
      );
    }

    const token = this.createJwtToken({ userId });

    return { userId, token };
  }

  checkUserPassword(password: string, passwordHash: string) {
    return bcrypt.compare(password, passwordHash);
  }
  createJwtToken(payload: { userId: string }) {
    if (process.env.JWT_SECRET) {
      return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
    }
  }
}
