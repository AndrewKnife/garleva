import { apiGet } from '@/shared/services/api';
import { ApiUser } from '@/shared/interfaces/api/apiUser';
import { API_URL } from '@/shared/constants/endpoints';

export const getUsers = async () => {
  const result = await apiGet<ApiUser[]>(API_URL.users);
  return result.isOk() ? result.value.data : null;
};
