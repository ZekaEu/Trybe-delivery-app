import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import CustomerProducts from './Pages/CustomerProducts';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
    </Routes>
  );
}

export default App;
