import axios from 'axios';

// set base URL
const API = axios.create({ baseURL: 'https://api.guillaumeblackburn.me' });

// api calls
export const login = (user) => API.post('/user/login', user);
export const registerStaff = (newUser) => API.post('/user/register-staff', newUser);
export const logout = () => API.get('/user/logout');
export const listStaff = () => API.get('/user/list-staff');
export const addMenuCategory = (name) => API.post('/menu/add-menu-category', name);
export const addMenuItem = (menuItem) => API.post('/menu/add-menu-item', menuItem, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});