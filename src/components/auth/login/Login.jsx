import React, { useState } from 'react';
import './Login.css';
import { login } from '../../core/api/users.api';
import { Redirect, Link } from 'react-router-dom';

export function Login(props){

    const [userData, setUserData]  = useState({});
    const[isLoggedUser, setLoggedUser] = useState(false); 
    const[errorMessage, setErrorMessage] = useState(''); // грижи се за това да показва errorMessage-а


    const onInputChange = (event) =>{
        event.persist();
        console.log(event);

//като параметър получава предишния state , който се е съдържал в userData , ...pS използваме за да не загубим информация
        setUserData((prevState) =>({
        ...prevState, 
        [event.target.name]: event.target.value // текущо поле , което променяме : стойността

         }));
        setErrorMessage('');
        console.log(userData);
    }
    
    const onFormSubmit = (event) =>{
        event.preventDefault();  //предотвратява поведението по подразбиране:
                                //формата да не се submit-ва с  GET, а ние да пускаме заявка за запазване
        login(userData).then(() =>{
            console.log('Login Success !');
            setLoggedUser(true);
        })
        .catch((err) => setErrorMessage(err.message));
    };

    return(
        //ако резултата от flaga e TRUE  само тогава ще изпълни redirect-a ,ако False зарежда формата за логин
        <>
        {isLoggedUser && <Redirect to="/"/>}  

        <div className="login-wrapper">
            <form className='login-form' onSubmit={onFormSubmit}> 

            {errorMessage && <span className='text-danger'>{errorMessage}</span>}
                <div className="form">
                    <label htmlFor='email'>Email:</label>
                    <input name='email' id='email' className='form-control' type='email' onChange={onInputChange}></input> 
                </div>
                <div className="form">
                    <label htmlFor='password'>Password:</label>
                    <input name='password' id='password' className='form-control' type='password' onChange={onInputChange}></input> 
                </div>
            <button className='btn btn-primary'>Login</button>
            <Link to='/register'>Don't have an account?<br/>Register</Link>
            </form>
        </div>
        </>
    )
}
