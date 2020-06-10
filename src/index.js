import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render( // определяме кой компонент да се рендерира за начало на проложението
  
  <BrowserRouter>
        <React.StrictMode> 
          <App />                            
        </React.StrictMode>  
  </BrowserRouter>
 ,
  document.getElementById('root') // react application-на се помества в този root element
);
 
serviceWorker.unregister();
