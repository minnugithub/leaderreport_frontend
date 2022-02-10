import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import LeaderReport from './App';

 
ReactDOM.render(
  <React.StrictMode>
    <LeaderReport />
  </React.StrictMode>,
  document.getElementById('root')
);


reportWebVitals();
