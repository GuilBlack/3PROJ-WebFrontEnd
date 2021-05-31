import axios from 'axios';

// set base URL
const API = axios.create({ baseURL: 'http://localhost:6969', withCredentials: true });

// login/logout
export const login = (user) => API.post('/user/login', user);
export const logout = () => API.get('/user/logout');

// staff
export const listStaff = () => API.get('/user/list-staff');
export const registerStaff = (newUser) => API.post('/user/register-staff', newUser);

// ingredients
export const listIngredients = () => API.get('/ingredient/get');
export const addIngredient = (ingredient) => API.post('/ingredient/add', ingredient);
export const deleteIngredient = (id) => API.delete('/ingredient/delete', {data: id});
export const updateStock = (ingredient) => API.put('./ingredient/update-stock', ingredient);

// menu category
export const getAllCategories = () => API.get('/menu/get-all-categories');
export const addMenuCategory = (menuCat) => API.post('/menu/add-menu-category', menuCat);
export const deleteCategory = (id) => API.delete('/menu/delete-category', {data: id});

// menu item
export const addMenuItem = (menuItem) => API.post('/menu/add-menu-item', menuItem, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteMenuItem = (id) => API.post('/menu/delete-menu-item', id)