export const routes = {
  login: {
    path: '/login',
    name: 'login',
    meta: {
      requiresGuest: true,
    },
  },
  main: {
    path: '/',
    name: 'Main',
    meta: {
      requiresAuth: false,
    },
  },
};
