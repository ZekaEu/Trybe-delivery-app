import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './LoginAndRegister.css';
import './ProductsPage.css';
import CustomerProducts from './Pages/CustomerProducts';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route exact path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}

export default App;
