import { apiGet } from '@/shared/services/api';
import { ApiPoll } from '@/shared/interfaces/api/apiPoll';

const pollsEndpoint = 'http://192.168.31.7:3000/polls';

export const getPolls = async () => {
  const result = await apiGet<ApiPoll[]>(pollsEndpoint);
  return result.isOk() ? result.value.data : null;
};
