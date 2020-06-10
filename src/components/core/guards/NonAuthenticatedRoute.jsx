import React from 'react';
import { getLoggedUser } from '../api/users.api';
import { Redirect } from 'react-router-dom';

export function NonAuthenticatedRoute(props){
    
    const loggedUser = getLoggedUser();
    
    if(!loggedUser){
        return <props.component {...props} /> // ако няма логнат user в системата  го оставяме да достъпва компонента който иска
    }
    
    return <Redirect to="/"/>

}