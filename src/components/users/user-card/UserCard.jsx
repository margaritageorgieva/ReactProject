import React from 'react';
import './UserCard.css';
import { Link } from 'react-router-dom';
import { getLoggedUser } from '../../core/api/users.api';

const cardStyle = {
    width: '18rem'
    
};

export function UserCard({ user, onDelete }){

    const loggedUser = getLoggedUser();

    return(
        <div className="card m-3" style={cardStyle}>
            <img src={user.picture} alt={user.name} id='upic'/>
            <div className="card-body">
                <h5 className="card-title"><Link to={`/users/${user.id}`}>{user.name}</Link></h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Age: {user.age}</li>
                <li className="list-group-item">Email: {user.email}</li>
            </ul>
            
         { loggedUser.isAdmin && <div className="card-body"><Link className='cursor-pointer' to={`/users/edit/${user.id}`}>Edit</Link> </div>}  
         { loggedUser.isAdmin && <div className='cursor-pointer' onClick={() => onDelete(user.id)}>Delete</div> } 
        </div>
        
    )

}