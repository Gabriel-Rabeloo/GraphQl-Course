import { AuthenticationError } from 'apollo-server-errors';

export const checkIsLoggedIn = (loggedUserId: string) => {
  if (!loggedUserId) {
    throw new AuthenticationError('You have to log in');
  }
};

export const checkOwner = (userId: string, loggedUserId: string) => {
  checkIsLoggedIn(loggedUserId);

  if (loggedUserId !== userId) {
    throw new AuthenticationError('You cannot update this user.');
  }
};
