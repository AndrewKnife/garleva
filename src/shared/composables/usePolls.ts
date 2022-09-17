import { Ref, ref } from 'vue';
import { ApiPollJson, Better, PollForm, PollOption } from '@/shared/interfaces/api/apiPoll';
import { getPolls } from '@/shared/services/polls/getPolls';
import { postPoll } from '@/shared/services/polls/postPoll';
import { deletePoll } from '@/shared/services/polls/deletePoll';
import { putPoll } from '@/shared/services/polls/putPoll';
import { ApiUser } from '@/shared/interfaces/api/apiUser';
import { usePeople } from '@/shared/composables/usePeople';
import { useMoney } from '@/shared/composables/useMoney';

interface UsePeopleReturns {
  polls: Ref<ApiPollJson[] | undefined>;
  pastPolls: Ref<ApiPollJson[] | undefined>;
  fetchPolls: () => void;
  createPoll: (newPoll: PollForm) => void;
  removePoll: (pollId: number) => void;
  betOnPoll: (poll: ApiPollJson, user: ApiUser, betValue: number, betOption: number) => void;
  finishPoll: (poll: ApiPollJson) => void;
  stopBettingOnPoll: (poll: ApiPollJson) => void;
}

const polls = ref<ApiPollJson[]>();
const pastPolls = ref<ApiPollJson[]>();

export const usePolls = (): UsePeopleReturns => {
  const { changeUserMoney } = useMoney();
  const { fetchUsers } = usePeople();
  const fetchPolls = () => {
    (async () => {
      polls.value = await getPolls();
      pastPolls.value = await getPolls(true);
    })();
  };

  const createPoll = (newPoll: PollForm) => {
    postPoll(newPoll).then(() => fetchPolls());
  };

  const removePoll = (pollId: number) => {
    deletePoll(pollId).then(() => fetchPolls());
  };

  const generateBettersList = (
    poll: ApiPollJson,
    user: ApiUser,
    betValue: number,
    betOption: number
  ): Better[] => {
    const newList: Better[] = [];
    poll.betters.forEach((better) => {
      if (better.id !== user.id) {
        newList.push(better);
      }
    });
    let newBetValue = betValue;
    let userBetOption = betOption;
    const currentBetter = poll.betters.find((better) => better.id === user.id);
    if (currentBetter) {
      newBetValue = currentBetter.betAmount + betValue;
      userBetOption = currentBetter.betOption;
    }
    newList.push({ ...user, betAmount: newBetValue, betOption: userBetOption });
    return newList;
  };

  const betOnPoll = (poll: ApiPollJson, user: ApiUser, betValue: number, betOption: number) => {
    if (!poll.finished) {
      const newBettersList = generateBettersList(poll, user, betValue, betOption);
      const updatedPoll: PollForm = {
        ...poll,
        poll: poll.poll + betValue,
        betters: JSON.stringify(newBettersList),
        options: JSON.stringify(poll.options),
      };
      putPoll(poll.id, updatedPoll).then(() => {
        fetchPolls();
        fetchUsers();
      });
    }
  };

  const stopBettingOnPoll = (poll: ApiPollJson) => {
    getPolls().then((newPolls) => {
      const newPoll = newPolls?.find((newP) => newP.id === poll.id);
      if (newPoll) {
        const updatedPoll: PollForm = {
          ...newPoll,
          betters: JSON.stringify(newPoll.betters),
          options: JSON.stringify(newPoll.options),
          allowBetting: false,
        };
        putPoll(poll.id, updatedPoll).then(() => {
          fetchPolls();
          fetchUsers();
        });
      }
    });
  };

  const updateWinnerMoneys = (poll: ApiPollJson) => {
    console.log(poll.betters);
    console.log(poll.winningOptions);
    const winners = poll.betters.filter((better) => poll.winningOptions.includes(better.betOption));
    const winnerPot = winners
      .map((winner) => winner.betAmount)
      .reduce((partialSum, a) => partialSum + a, 0);
    winners.forEach((better) => {
      const winPercentage = (better.betAmount * 100) / winnerPot;
      const winMoney = Math.ceil((poll.poll * winPercentage) / 100);
      changeUserMoney(
        {
          id: better.id,
          score: better.score,
          name: better.name,
          secret: better.secret,
        },
        winMoney
      );
    });
  };

  const finishPoll = (poll: ApiPollJson) => {
    console.log(poll);
    getPolls().then((newPolls) => {
      console.log('foundpoll');
      const newPoll = newPolls?.find((newP) => newP.id === poll.id);
      console.log(newPoll);
      if (newPoll && !newPoll.finished) {
        const updatedPoll = {
          ...newPoll,
          betters: newPoll.betters,
          options: newPoll.options,
          winningOptions: poll.winningOptions,
          finished: true,
        };
        const updatedPollForDb: PollForm = {
          ...updatedPoll,
          betters: JSON.stringify(updatedPoll.betters),
          options: JSON.stringify(updatedPoll.options),
          finished: true,
        };
        console.log(updatedPoll);
        updateWinnerMoneys(updatedPoll);
        console.log('updateWinnerMoneys');
        putPoll(newPoll.id, updatedPollForDb).then(() => {
          fetchPolls();
          fetchUsers();
        });
      }
    });
  };

  return {
    polls,
    pastPolls,
    fetchPolls,
    createPoll,
    removePoll,
    betOnPoll,
    finishPoll,
    stopBettingOnPoll,
  };
};
