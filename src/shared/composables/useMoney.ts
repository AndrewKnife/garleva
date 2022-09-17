import { Ref, ref } from 'vue';
import { ApiPoll, PollForm } from '@/shared/interfaces/api/apiPoll';
import { getPolls } from '@/shared/services/polls/getPolls';
import { postPoll } from '@/shared/services/polls/postPoll';
import { deletePoll } from '@/shared/services/polls/deletePoll';
import { putPoll } from '@/shared/services/polls/putPoll';
import { ApiUser } from '@/shared/interfaces/api/apiUser';

interface UsePeopleReturns {
  polls: Ref<ApiPoll[] | undefined>;
  fetchPolls: () => void;
  createPoll: (newPoll: PollForm) => void;
  removePoll: (pollId: number) => void;
  betOnPoll: (poll: ApiPoll, user: ApiUser, betValue: number) => void;
}

const polls = ref();

export const usePolls = (): UsePeopleReturns => {
  const fetchPolls = () => {
    (async () => {
      polls.value = await getPolls();
    })();
  };

  const createPoll = (newPoll: PollForm) => {
    postPoll(newPoll).then(() => fetchPolls());
  };

  const removePoll = (pollId: number) => {
    deletePoll(pollId).then(() => fetchPolls());
  };

  const betOnPoll = (poll: ApiPoll, user: ApiUser, betValue: number) => {
    const updatedPoll: PollForm = {
      name: '',
      betters: '',
    };
    putPoll(poll.id, updatedPoll).then(() => fetchPolls());
  };

  return { polls, fetchPolls, createPoll, removePoll, betOnPoll };
};
