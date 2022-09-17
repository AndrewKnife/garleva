import { apiPost } from '@/shared/services/api';
import { PollForm } from '@/shared/interfaces/api/apiPoll';

const pollsEndpoint = 'http://192.168.31.7:3000/polls';

export const postPoll = async (pollData: PollForm) => {
  const result = await apiPost(pollsEndpoint, { body: JSON.stringify(pollData) });
  return result.isOk() ? result.value.data : null;
};
