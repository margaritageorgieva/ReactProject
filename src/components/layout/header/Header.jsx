import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { logout, getLoggedUser } from '../../core/api/users.api';


const styles ={
  color: "lightgray",
  cursor:"pointer",
  border: "1px solid white",
  borderRadius: "5px",
  padding: "5px 10px"
}
const style ={
  fontSize: "15px"
}
const styless={
  position: "absolute",
  right:"8rem"
}

export function Header() {

  
  const [isLoggedOut, setLogoutFlag] = useState(false);

  const onLogout = (event) => {
    logout();
    setLogoutFlag(true);
  }

  return (
    <>
      {isLoggedOut && <Redirect to='/login' />}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {!isLoggedOut && (
          <span className="navbar-brand" href="#">
            Hello, {getLoggedUser().name}!
          </span>
        )}
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">

          
            <li className="nav-item active">
              <Link to='/' className="nav-link">Home</Link>
            </li>

            <li className="nav-item">
              <Link to='/users' className="nav-link">Users</Link>
            </li>

            <li className="nav-item">
              <Link to='/users/create' className="nav-link"> Create User</Link>
            </li>

            <li className="nav-item">
              <Link to='/tasks' className="nav-link">  All tasks</Link>
            </li>

            <li className="nav-item">
              <Link to='/tasks/my-tasks'className="nav-link">  My tasks</Link>
            </li>
            <li className="nav-item">
              <Link to='/tasks/create' className="nav-link">  Create task</Link>
            </li>
            <div style={styless}>
            <form className="form-inline my-2 my-lg-0" id='form'>
              <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
            </div >
          </ul>
          
        </div>
        <span className='bogout-btn'  style={styles} onClick={onLogout}>Logout</span>
      </nav>
    </>
  );
}