import { apiDelete } from '@/shared/services/api';
import { API_URL } from '@/shared/constants/endpoints';

export const deletePoll = async (pollId: number) => {
  const result = await apiDelete(`${API_URL.polls}/${pollId}`);
  return result.isOk() ? result.value.data : null;
};
