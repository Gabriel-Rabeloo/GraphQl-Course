import bcrypt from 'bcrypt';

import { UserInputError, ValidationError } from 'apollo-server-errors';
import { DataSources, InputUser } from '../../../types/simpleTypes';

export const createUserFn = async (userData: InputUser, dataSource: any) => {
  await checkUserFields(userData, true);

  const indexRefUser = await dataSource.get('', {
    _limit: 1,
    _sort: 'indexRef',
    _order: 'desc',
  });
  const indexRef = indexRefUser[0].indexRef + 1;

  const foundUser = await userExists(userData.userName, dataSource);

  if (typeof foundUser !== 'undefined') {
    throw new ValidationError(
      `userName ${userData.userName} has already been taken`,
    );
  }

  return dataSource.post('', {
    ...userData,
    indexRef,
    createdAt: new Date().toISOString(),
  });
};

export const updateUserFn = async (
  userId: string,
  userData: InputUser,
  dataSource: any,
) => {
  await checkUserFields(userData, false);

  if (!userId) throw new ValidationError('Missing userId');

  if (userData.userName) {
    const foundUser = await userExists(userData.userName, dataSource);

    if (typeof foundUser !== 'undefined' && foundUser.id !== userId) {
      throw new ValidationError(
        `userName ${userData.userName} has already been taken`,
      );
    }
  }

  return dataSource.patch(userId, { ...userData });
};

export const deleteUserFn = async (userId: string, dataSource: any) => {
  if (!userId) throw new ValidationError('Missing userId');

  return !!(await dataSource.delete(userId));
};

const userExists = async (userName: string, dataSource: DataSources) => {
  // /users/?userName=nomeBuscado
  const found = await dataSource.get('', {
    userName,
  });
  return found[0];
};

const validateUserName = (userName: string) => {
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) {
    throw new ValidationError(
      `Username must start with a letter and cannot contain special characters`,
    );
  }
};

const validateUserPassword = (password: string) => {
  // Letra minúscula, letra maiúscula e número
  const strongPasswordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,30}$/;

  if (!password.match(strongPasswordRegExp)) {
    throw new UserInputError(
      'Password must contain at least: Six or more characters ,One lower case letter, one upper case letter and one number',
    );
  }
};

const checkUserFields = async (user: any, allFieldsRequired = false) => {
  const userFields = ['firstName', 'lastName', 'userName', 'password'];

  for (const field of userFields) {
    if (!allFieldsRequired) {
      if (typeof user[field] === 'undefined') {
        continue;
      }
    }

    if (field === 'userName') {
      validateUserName(user[field]);
    }

    if (field === 'password') {
      validateUserPassword(user[field]);
    }

    if (!user[field]) {
      throw new Error(`Missing ${field}`);
    }
  }

  if (user.password && !user.passwordHash) {
    const { password } = user;
    const passwordHash = await bcrypt.hash(password, 12);
    user.passwordHash = passwordHash;
    delete user['password'];
  }
};
