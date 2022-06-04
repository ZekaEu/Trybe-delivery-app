import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import DeliveryContext from './Context/DeliveryContext';
import ContextComp from './Components/ContextComp';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ContextComp>
        <App />
      </ContextComp>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
