import { AuthenticationError } from 'apollo-server-errors';

export const loginValidate = (userId = '', loggedUserId: string) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in to update your account');
  }
  if (userId !== '' && loggedUserId !== userId) {
    throw new AuthenticationError('You cannot update this user');
  }
};
