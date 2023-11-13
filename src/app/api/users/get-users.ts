import { USERS } from '~/lib/consts/user';

export const QUERY_KEYS = {
  allUsers: 'allUsers',
};

export const getUsers = async ({ pageParam = 0 }) => {
  return {
    results: USERS,
    nextOffset: pageParam + 1,
  };
};
