import { apiPost } from '@/shared/services/api';
import { PollForm } from '@/shared/interfaces/api/apiPoll';
import { API_URL } from '@/shared/constants/endpoints';

export const postPoll = async (pollData: PollForm) => {
  const result = await apiPost(API_URL.polls, { body: JSON.stringify(pollData) });
  return result.isOk() ? result.value.data : null;
};
