import React from 'react';
import { Switch} from 'react-router-dom';
import { UsersList } from '../../users/users-list/UsersList';
import { User } from '../../users/user/User';
import { AuthenticatedRoute } from '../../core/guards/AuthenticatedRoute';
import { UserEdit } from '../../users/user-edit/UserEdit';
import './Main.css';
import { TasksList } from '../../tasks/tasks-list/TasksList';
import { TaskEdit } from '../../tasks/task-edit/TaskEdit';
import { MyTasks } from '../../tasks/my-tasks/MyTasks';



export function Main({count}){ // Tova e funkcionalen komponent


    return(
        <div className="main-content">
            <Switch>
                
                <AuthenticatedRoute exact path='/users' component={UsersList}/>
                <AuthenticatedRoute exact path='/users/create' admin={true} component={UserEdit}/>
                <AuthenticatedRoute exact path='/users/:id' component={User}/>
                <AuthenticatedRoute exact path='/users/edit/:id' admin={true} component = {UserEdit}/>
               
              
              <AuthenticatedRoute exact path='/tasks' component={TasksList}/>
              <AuthenticatedRoute exact path='/tasks/my-tasks' component={MyTasks}/>
              <AuthenticatedRoute exact path='/tasks/create' component={TaskEdit}/>
              <AuthenticatedRoute exact path='/tasks/edit/:id' component={TaskEdit}/>
            </Switch>
            
        </div>
    );
}
