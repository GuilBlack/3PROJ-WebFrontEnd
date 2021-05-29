import Amplify, { API } from 'aws-amplify';

Amplify.configure({
    API: {
        endpoints: [
            {
                name: "name",
                endpoint: "https://api.guillaumeblackburn.me",
                withCredentials: true
            }
        ]
    }
});


const obj = { // OPTIONAL
    headers: {}, // OPTIONAL
    response: true, // OPTIONAL (return the entire Axios response object instead of only response.data)
    queryStringParameters: {  // OPTIONAL
        name: 'param',
    },
};

// api calls
export const login = (user) => API.post('name', '/user/login', {
    headers: {},
    response: true,
    body: user
});


export const registerStaff = (newUser) => API.post('/user/register-staff', newUser);
export const logout = () => API.get('/user/logout');
export const listStaff = () => API.get('/user/list-staff');
export const addMenuCategory = (name) => API.post('/menu/add-menu-category', name);
export const addMenuItem = (menuItem) => API.post('/menu/add-menu-item', menuItem, {
    headers: {
        "Content-Type": "multipart/form-data",
    },
});