import { Ref, ref } from 'vue';
import { getUsers } from '@/shared/services/getUsers';
import { ApiUser } from '@/shared/interfaces/api/apiUser';

interface UsePeopleReturns {
  users: Ref<ApiUser[] | undefined>;
  fetchUsers: () => void;
}

const users = ref();

export const usePeople = (): UsePeopleReturns => {
  const fetchUsers = () => {
    (async () => {
      users.value = await getUsers();
    })();
  };

  return { users, fetchUsers };
};
