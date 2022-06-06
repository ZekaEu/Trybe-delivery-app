import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductsNavigation() {
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const { name } = JSON.parse(localStorage.getItem('login'));
    setUserName(name);
  }, []);

  const handleLogOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <header>
      <nav className="products-nav">
        <span className="nav-span">PRODUTOS</span>
        <span className="nav-span">MEUS PEDIDOS</span>
        <span className="nav-span">{ userName }</span>
        <button
          className="btn btn-outline-danger log-out"
          type="button"
          onClick={ handleLogOut }
        >
          Log out
        </button>
      </nav>
    </header>
  );
}
