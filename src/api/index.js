import axios from 'axios';

// axios calls
export const login = (user) => axios.post('/user/login', user);
export const registerStaff = (newUser) => axios.post('/user/register-staff', newUser);
export const logout = () => axios.get('/user/logout');
export const listStaff = () => axios.get('/user/list-staff');
export const addMenuCategory = (name) => axios.post('/menu/add-menu-category', name);
export const addMenuItem = (menuItem) => axios.post('/menu/add-menu-item', menuItem, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});