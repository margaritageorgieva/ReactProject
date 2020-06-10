import React, { useState, useEffect } from 'react';
import { TaskCard } from '../task-card/TaskCard';
import { getMyTasks } from '../../core/api/tasks.api';

export function MyTasks() {
    const [userTasks, setUserTasks] = useState([]);


    useEffect(() => {
        getMyTasks().then((tasks) => {
            setUserTasks(tasks);
            console.log(tasks)
        });
    }, []);


    return (
        <div className="my-tasks-wrapper">
            {userTasks.map(task => <TaskCard task={task} key={task.id} />)}
        </div>
    );
}