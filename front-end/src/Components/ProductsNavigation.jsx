import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductsNavigation() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUserName(name);
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <nav className="products-nav">
        <span
          className="nav-span"
          data-testid="customer_products__element-navbar-link-products"
        >
          PRODUTOS
        </span>
        <span
          className="nav-span"
          data-testid="customer_products__element-navbar-link-orders"
        >
          MEUS PEDIDOS
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
