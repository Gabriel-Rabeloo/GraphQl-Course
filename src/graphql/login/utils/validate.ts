import { AuthenticationError } from 'apollo-server-errors';

export const loginValidate = (userId = '', loggedUserId: string) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in to do this action.');
  }
  if (userId !== '' && loggedUserId !== userId) {
    throw new AuthenticationError('You cannot update or delete this user');
  }
};
