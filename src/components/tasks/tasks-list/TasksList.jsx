import React, { useState, useEffect } from 'react';
import { getAllTasks, deleteTask } from '../../core/api/tasks.api';
import { TaskCard } from '../task-card/TaskCard';

export function TasksList (){

    const [tasks, setTasks] = useState([]);

    
    
    useEffect(() =>{
        getAllTasks().then((result) =>{ 
                setTasks(result.data); 
        });
    },[]) 

    const onDelete = (id) =>{
        deleteTask(id).then(() =>{
            setTasks((prevState) =>{
                    return prevState.filter(task => task.id !== id);
            })
        })
    };

    return(
      
            <div className="tasks-list-wrapper d-flex flex-wrap justify-content-around">
                {tasks.map(task => <TaskCard task={task} key={task.id}  onDeleteClick ={onDelete}/>)}
            </div>
    );
}