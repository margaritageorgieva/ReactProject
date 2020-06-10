import React from 'react';
import { Link } from 'react-router-dom';
import editt from './iconEdit-25.png';
import './TaskCard.css';
import { getLoggedUser } from '../../core/api/users.api';
import { TaskStatus } from '../../core/api/tasks.api';



const taskCardStyle = {
    maxWidth: '18rem',
    marginTop: '20px',
    minHeight: '6rem'

}
//като prop получава информацията за бележката , която искаме да покажем; task е propa
//използваме деструктуриране
export function TaskCard({ task, onDeleteClick }) {
    const loggedUser = getLoggedUser();

    let taskClassByType='card text-white m-3 ';
    switch(task.status){
        case TaskStatus.Active: taskClassByType += 'bg-primary ';break;
        case TaskStatus.Pending: taskClassByType += 'bg-success';break;
        case TaskStatus.Done: taskClassByType += 'bg-secondary';break;
        default: taskClassByType += 'card text-white bg-dark mb-3';break;
    }

    return (

        <div className='tasks-wrapper'>   
            <div className={taskClassByType} style={taskCardStyle}>
                <div className="card-header">
                    {task.title}
                
                
                </div>
                <div className="card-body" >
                    <p className="card-text">{task.content}</p>
                </div>
                <div className="card-footer bg-transparent border-secondary">
                    <div>Author: {task.authorName}</div>
                    <div>Created on: {task.date}</div>
                    <div>Rating of task: {task.rating}</div> <br/>
                    {( loggedUser.isAdmin || loggedUser.id === task.authorId) && <span className='cursor-pointer' onClick= {() => onDeleteClick(task.id)}>Delete</span>}
                    {( loggedUser.isAdmin || loggedUser.id === task.authorId) && <Link to={ `/tasks/edit/${task.id}` }> <img  id='edit'src={editt} alt='edit'/> </Link>}
                </div>
            </div>
        </div>

    )
}