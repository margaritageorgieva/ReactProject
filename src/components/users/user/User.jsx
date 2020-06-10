import React, { Component } from 'react';
import { getUserById } from '../../core/api/users.api';
import { UserCard } from '../user-card/UserCard';
import { getTasksByAuthorId, deleteTask } from '../../core/api/tasks.api';
import { TaskCard } from '../../tasks/task-card/TaskCard';

export class User extends Component{

    constructor(props){
        super(props);

        this.state = {
                user:{},
                tasks:[]
        };
    }
    
    componentDidMount(){
        console.log(this.props)
        getUserById(this.props.computedMatch.params.id).then((response)=>{ 
            this.setState({
                user: response.data //запазваме текущия user в state-a
            });
        });

        getTasksByAuthorId(this.props.computedMatch.params.id).then((tasks) =>{
            this.setState({
                tasks
            })
           
        })
    }

     onDelete = (id) =>{
        deleteTask(id).then(() =>{

            const allTasks = this.state.tasks;
            const newTasks = allTasks.filter(task => task.id !== id);
            this.setState({
                    tasks:newTasks
            });
        })
    };
    render(){
        return(
           
            <div className="single-user">
               <UserCard user={this.state.user}/> 
               {this.state.tasks.map(task => <TaskCard task={task} key={task.id} onDeleteClick={this.onDelete}/>)}
            </div>
        )
    }
}
