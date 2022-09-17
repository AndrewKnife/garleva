import { Ref, ref } from 'vue';
import { ApiUser } from '@/shared/interfaces/api/apiUser';

interface UsePeopleReturns {
  user: Ref<ApiUser | undefined>;
  getSavedUser: () => void;
  saveUser: (user: ApiUser | undefined) => void;
  clearUser: () => void;
  isAdmin: () => boolean;
}

const user = ref<ApiUser>();

export const useCurrentUser = (): UsePeopleReturns => {
  const getSavedUser = () => {
    try {
      user.value = JSON.parse(localStorage.getItem('user') || '');
    } catch (e) {
      console.log(e);
    }
  };
  const saveUser = (userToSave: ApiUser | undefined) => {
    if (userToSave) {
      localStorage.setItem('user', JSON.stringify(userToSave));
      getSavedUser();
    }
  };
  const clearUser = () => {
    localStorage.removeItem('user');
    user.value = undefined;
  };
  const isAdmin = () => {
    return user.value?.name.toLowerCase() === 'admin';
  };
  return { user, getSavedUser, saveUser, clearUser, isAdmin };
};
