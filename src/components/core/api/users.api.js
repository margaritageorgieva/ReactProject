import axios from 'axios';
import { deleteTasksForAuthor } from './tasks.api';

const apiUrl = 'http://localhost:3005';

export function getLoggedUser(){
// От getItem прочита логнатия user и връща string , затова използваме JSON.parse , който го парсва отново към обект
    return JSON.parse(localStorage.getItem('loggedUser',))
}

export function getAllUsers(){
    return axios.get(`${apiUrl}/users`);
}

export function getUserById(id){
    return axios.get(`${apiUrl}/users/${id}`);
}


export async function register(userData){
const users = (await getAllUsers()).data;

// чрез функцията find правим проверка ако  emaila вече съществува хвърля грешка 
if(users.find(u => u.email === userData.email)){
    throw new Error('Email already exists !')
}
    userData={
        ...userData,
        isActive: true,
        isAdmin: false,
        picture: "https://picsum.photos/200/300?random=8",
    }
    return axios.post(`${apiUrl}/users`,userData); //изпраща POST заяква към json-servera
}

export  async function login(userData){
    const users = (await getAllUsers()).data;

    const loggedUser = users.find(u => u.email === userData.email && u.password.toString() === userData.password);

     if( loggedUser && !loggedUser.isActive){
        throw new Error('The current user has been blocked !');
     }
// ако сме намерили логнат потребител го запазваме в localStorage ;JSON.stringify - от обект го превръща в стринг
    if(loggedUser){
            localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
            return;
    }
    throw new Error('Incorrect email / password !'); 
}

export function logout(){
    localStorage.removeItem('loggedUser');
}
//функция , която се грижи за едитването и създаването на useri
export function saveUser(userData){
    if(userData.id){
        return axios.put(`${apiUrl}/users/${userData.id}`,userData); 
    }
    return register(userData); 
    /* преизползваме метода за регистрация - автоматично попълва данните , който ги няма за потребителя*/ 
}
export function deleteUser(id){
    deleteTasksForAuthor(id);
    return axios.delete(`${apiUrl}/users/${id}`);
}