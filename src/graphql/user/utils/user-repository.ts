import { ValidationError } from 'apollo-server-errors';
import { InputUser, User } from '../../../interfaces/simpleTypes';
import { checkUserFields, userExists } from './validate';

export const createUserFn = async (userData: InputUser, dataSource: any): Promise<User> => {
  await checkUserFields(userData, true);

  const indexRefUser = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });
  const indexRef = (indexRefUser[0].indexRef + 1) as number;

  const foundUser = await userExists(userData.userName, dataSource);

  if (typeof foundUser !== 'undefined') {
    throw new ValidationError(`userName ${userData.userName} has already been taken`);
  }

  return dataSource.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};

export const updateUserFn = async (userId: string, userData: InputUser, dataSource: any): Promise<User> => {
  await checkUserFields(userData, false);

  if (!userId) throw new ValidationError('Missing userId');

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {
      throw new ValidationError(`userName ${userData.userName} has already been taken`);
    }
  }

  return dataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId: string, dataSource: any) => {
  if (!userId) throw new ValidationError('Missing userId');

  return !!(await dataSource.delete(userId));
};
