import SUPPORT_USERS from '@/constants/users';

export default function (username: string) {
  return SUPPORT_USERS.includes(username);
}
