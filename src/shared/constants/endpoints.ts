const baseUrlHome = 'http://192.168.31.7:3000';
const baseUrlOffice = 'http://192.168.20.238:3000';
const baseUrlMyPhone = 'http://192.168.43.200:3000';
const herokuApp = 'https://garleva.herokuapp.com';

const baseUrl = herokuApp;

export const API_URL = {
  polls: `${baseUrl}/polls?_sort=id&finished=false&_order=desc`,
  pastPolls: `${baseUrl}/polls?_sort=id&_order=desc&finished=true`,
  poll: (id: string | number) => `${baseUrl}/polls/${id}`,
  users: `${baseUrl}/users?_sort=score&_order=desc`,
  user: (id: string | number) => `${baseUrl}/users/${id}`,
};
