import { apiPut } from '@/shared/services/api';
import { PollForm } from '@/shared/interfaces/api/apiPoll';
import { API_URL } from '@/shared/constants/endpoints';

export const putPoll = async (pollId: number, pollData: PollForm) => {
  const result = await apiPut(API_URL.poll(pollId), { body: JSON.stringify(pollData) });
  return result.isOk() ? result.value.data : null;
};
