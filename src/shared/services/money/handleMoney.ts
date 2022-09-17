import { apiPut } from '@/shared/services/api';
import { API_URL } from '@/shared/constants/endpoints';
import { ApiUser } from '@/shared/interfaces/api/apiUser';

export const putMoney = async (user: ApiUser, newScore: number) => {
  const updatedUser: ApiUser = {
    ...user,
    score: newScore,
  };
  const result = await apiPut(`${API_URL.user(user.id)}`, { body: JSON.stringify(updatedUser) });
  return result.isOk() ? result.value.data : null;
};
