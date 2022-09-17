const baseUrlHome = '192.168.31.7';
const baseUrlOffice = '192.168.20.238';
const baseUrlMyPhone = '192.168.43.200';

const baseUrl = baseUrlMyPhone;

export const API_URL = {
  polls: `http://${baseUrl}:3000/polls?_sort=id&finished=false&_order=desc`,
  pastPolls: `http://${baseUrl}:3000/polls?_sort=id&_order=desc&finished=true`,
  poll: (id: string | number) => `http://${baseUrl}:3000/polls/${id}`,
  users: `http://${baseUrl}:3000/users?_sort=score&_order=desc`,
  user: (id: string | number) => `http://${baseUrl}:3000/users/${id}`,
};
