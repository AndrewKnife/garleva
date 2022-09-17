import { apiGet } from '@/shared/services/api';
import { ApiPoll, ApiPollJson, Better, PollOption } from '@/shared/interfaces/api/apiPoll';
import { API_URL } from '@/shared/constants/endpoints';

export const getPolls = async (past = false): Promise<ApiPollJson[] | undefined> => {
  const result = await apiGet<ApiPoll[]>(past ? API_URL.pastPolls : API_URL.polls);
  let returnVal;
  if (result.isOk()) {
    returnVal = result.value.data.map((pollItem) => {
      const item: ApiPollJson = {
        ...pollItem,
        betters: JSON.parse(pollItem.betters || '[]') as Better[],
        options: JSON.parse(pollItem.options || '[]') as PollOption[],
        winningOptions: pollItem.winningOptions,
      };
      return item;
    });
  }

  return returnVal;
};
