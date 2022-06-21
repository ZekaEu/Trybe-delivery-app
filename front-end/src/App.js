import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './LoginAndRegister.css';
import './ProductsPage.css';
import './OrdersPage.css';
import './SellerPage.css';
import CustomerProducts from './Pages/CustomerProducts';
import CustomerCheckout from './Pages/CustomerCheckout';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Admin from './Pages/Admin';
import OrderDetails from './Pages/OrderDetails';
import OrdersPage from './Pages/OrdersPage';
import SellersPage from './Pages/SellersPage';
import SaleDetails from './Pages/SaleDetails';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={ <Navigate to="/login" /> } />
      <Route exact path="/login" element={ <Login /> } />
      <Route exact path="/register" element={ <Register /> } />
      <Route exact path="/customer/checkout" element={ <CustomerCheckout /> } />
      <Route exact path="/customer/products" element={ <CustomerProducts /> } />
      <Route exact path="/customer/orders/:id" element={ <OrderDetails /> } />
      <Route exact path="/seller/orders/:id" element={ <SaleDetails /> } />
      <Route exact path="/customer/orders" element={ <OrdersPage /> } />
      <Route exact path="/seller/orders" element={ <SellersPage /> } />
      <Route exact path="/admin/manage" element={ <Admin /> } />
    </Routes>
  );
}

export default App;
