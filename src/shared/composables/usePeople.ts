import { Ref, ref } from 'vue';
import { getUsers } from '@/shared/services/getUsers';
import { ApiUser } from '@/shared/interfaces/api/apiUser';
import { useCurrentUser } from '@/shared/composables/useCurrentUser';

interface UsePeopleReturns {
  users: Ref<ApiUser[] | undefined>;
  admin: Ref<ApiUser | undefined>;
  fetchUsers: () => void;
}

const users = ref();
const admin = ref();

export const usePeople = (): UsePeopleReturns => {
  const { user: currentUser, saveUser } = useCurrentUser();
  const fetchUsers = () => {
    (async () => {
      const theUsers = await getUsers();
      if (theUsers) {
        users.value = theUsers.filter((user) => user.name.toLowerCase() !== 'admin');
        admin.value = theUsers.find((user) => user.name.toLowerCase() === 'admin');
      }
      saveUser(theUsers?.find((allUsers) => allUsers.id === currentUser.value?.id));
    })();
  };

  return { users, admin, fetchUsers };
};
