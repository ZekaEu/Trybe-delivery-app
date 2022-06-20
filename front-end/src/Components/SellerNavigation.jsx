import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';

export default function SellerNavigation() {
  const { setTotalPrice } = useContext(DeliveryContext);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUserName(name);
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    setTotalPrice(0);
    navigate('/login');
  };

  return (
    <header>
      <nav className="seller-nav">
        <span
          className="nav-span"
        >
          <button
            type="button"
            data-testid="customer_products__element-navbar-link-products"
            // onClick={ () => navigate('/customer/products') } ??
          >
            PEDIDOS
          </button>
        </span>
        <span
          className="nav-span"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { userName }
        </span>
        <button
          className="btn btn-outline-danger log-out"
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ handleLogOut }
        >
          Log out
        </button>
      </nav>
    </header>
  );
}
