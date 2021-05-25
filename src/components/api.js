import axios from 'axios';

// set base URL
const API = axios.create({ baseURL: 'http://localhost:6969', withCredentials: true });

// api calls
export const login = (user) => API.post('/user/login', user);
export const registerStaff = (newUser) => API.post('/user/register-staff', newUser);
export const logout = () => API.get('/user/logout');