import bcrypt from 'bcrypt';
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';
import { User } from '../../types/simpleTypes';
import jwt from 'jsonwebtoken';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
  }

  async getUser(userName: string): Promise<User[]> {
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
    return user;
  }

  async login(
    userName: string,
    password: string,
  ): Promise<{
    userId: string;
    token: string;
  }> {
    const user = await this.getUser(userName);

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

    const token = this.createJwtToken({ userId }) as string;
    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });

    return { userId, token };
  }

  async logout(userName: string): Promise<boolean> {
    const user = await this.getUser(userName);

    const { id: userId } = user[0];

    if (userId !== this.context.loggedUserId) {
      throw new AuthenticationError('You are not this user.');
    }

    await this.patch(userId, { token: '' }, { cacheOptions: { ttl: 0 } });
    return true;
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
