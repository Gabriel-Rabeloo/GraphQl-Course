import bcrypt from 'bcrypt';
import { RESTDataSource } from 'apollo-datasource-rest';
import { AuthenticationError } from 'apollo-server-errors';
import { User } from '../../../interfaces/simpleTypes';
import jwt from 'jsonwebtoken';

export class LoginApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.API_URL + '/users/';
  }

  async getUser(userName: string): Promise<User[]> {
    const user: User[] = await this.get('', { userName }, { cacheOptions: { ttl: 0 } });
    const found = !!user.length;

    if (!found) {
      throw new AuthenticationError('User does not exist or password is invalid');
    }
    return user;
  }

  async login(userName: string, password: string): Promise<{ userId: string; token: string }> {
    const user = await this.getUser(userName);

    const { passwordHash, id: userId } = user[0];
    const isPasswordValid = await this.checkUserPassword(password, passwordHash);

    if (!isPasswordValid) {
      throw new AuthenticationError('User does not exist or password is invalid');
    }

    const token = this.createJwtToken({ userId }) as string;
    await this.patch(userId, { token }, { cacheOptions: { ttl: 0 } });

    // Response Header
    this.context.res.cookie('jwtToken', token, {
      secure: process.env.COOKIE_SECURE || true, // Rede segura - Https
      httpOnly: true, // Não deve ser acessado via código
      maxAge: process.env.COOKIE_MAX_AGE || 1000 * 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'strict', // strict lax none
    });

    return { userId, token };
  }

  async logout(userName: string): Promise<boolean> {
    const user = await this.getUser(userName);

    const { id: userId } = user[0];

    if (userId !== this.context.loggedUserId) {
      throw new AuthenticationError('You are not this user.');
    }

    await this.patch(userId, { token: '' }, { cacheOptions: { ttl: 0 } });
    this.context.res.clearCookie('jwtToken');
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
