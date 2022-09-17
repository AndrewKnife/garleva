import { ApiUser } from '@/shared/interfaces/api/apiUser';
import { putMoney } from '@/shared/services/money/handleMoney';
import { usePeople } from '@/shared/composables/usePeople';
import { getUsers } from '@/shared/services/getUsers';

interface UsePeopleReturns {
  changeUserMoney: (user: ApiUser, money: number) => void;
}

export const useMoney = (): UsePeopleReturns => {
  const { fetchUsers } = usePeople();
  const changeUserMoney = (user: ApiUser, money: number) => {
    getUsers().then((latestUsers) => {
      if (latestUsers?.length) {
        const updatedUser = latestUsers.find((latestUser) => latestUser.id === user.id);
        if (updatedUser) {
          const moneyChange = money;
          let newMoneyCount = updatedUser.score;
          if (moneyChange >= 0 || newMoneyCount + moneyChange >= 0) {
            newMoneyCount += moneyChange;
          } else {
            newMoneyCount = 0;
          }
          putMoney(updatedUser, newMoneyCount).then(() => fetchUsers());
        }
      }
    });
  };

  return { changeUserMoney };
};
