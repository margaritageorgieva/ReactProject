import axios from 'axios';
import { getLoggedUser } from './users.api';

const apiUrl = 'http://localhost:3005';

export const TaskStatus = {
    Active: 'Active',
    Pending: 'Pending',
    Done: 'Done'
}

export function getAllTasks() {
    return axios.get(`${apiUrl}/tasks`);
}


export function getTaskById(id) {
    return axios.get(`${apiUrl}/tasks/${id}`);
}


export async function getTasksByAuthorId(authorId) {
    const allTasks = (await getAllTasks()).data;
    //na vsqka zadacha iskam id-to na avtora da otgovarq na tova koeto sum podala kato parametur na getTasksByAuthorId
    return allTasks.filter(task => task.authorId === authorId);
}


export function getMyTasks() {
    const loggedUserId = getLoggedUser().id;

    return getTasksByAuthorId(loggedUserId);
}



export function saveTask(taskData) {
    const loggedUser = getLoggedUser();

    if (taskData.id) {
        return axios.put(`${apiUrl}/tasks/${taskData.id}`, taskData);
    }



    taskData.authorId = loggedUser.id;
    taskData.authorName = loggedUser.name;
    taskData.date = new Date();


    if (!taskData.status)
        taskData.status = TaskStatus.Active;


    return axios.post(`${apiUrl}/tasks`, taskData);
}
export function deleteTask(id) {
    return axios.delete(`${apiUrl}/tasks/${id}`);
}
export async function deleteTasksForAuthor(authorId) {

    const tasks = await getTasksByAuthorId(authorId);

    tasks.forEach(task => {
        deleteTask(task.id);
    });
}