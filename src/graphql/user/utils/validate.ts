import { UserInputError, ValidationError } from 'apollo-server-errors';
import bcrypt from 'bcrypt';
import { DataSources } from '../../../interfaces/simpleTypes';

const validateUserName = (userName: string) => {
  const userNameRegExp = /^[a-z]([a-z0-9_.-]+)+$/gi;

  if (!userName.match(userNameRegExp)) {
    throw new ValidationError(`Username must start with a letter and cannot contain special characters`);
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

export const checkUserFields = async (user: any, allFieldsRequired = false) => {
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

export const userExists = async (userName: string, dataSource: DataSources) => {
  // /users/?userName=nomeBuscado
  const found = await dataSource.get('', {
    userName,
  });
  return found[0];
};
