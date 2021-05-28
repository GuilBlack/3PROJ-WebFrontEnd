import axios from 'axios';
import Amplify, { API } from 'aws-amplify';

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "name",
                endpoint: "https://api.guillaumeblackburn.me",

            }
        ]
    }
});

// set base URL
const API2 = axios.create({ baseURL: 'https://api.guillaumeblackburn.me', withCredentials: true });

// // api calls
export const login = (user) => API.post('name', '/user/login', {body: user} );
export const registerStaff = (newUser) => API2.post('/user/register-staff', newUser);
export const logout = () => API2.get('/user/logout');
export const listStaff = () => API2.get('/user/list-staff');
export const addMenuCategory = (name) => API2.post('/menu/add-menu-category', name);
export const addMenuItem = (menuItem) => API2.post('/menu/add-menu-item', menuItem, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});