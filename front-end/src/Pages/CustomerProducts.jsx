import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsCards from '../Components/ProductsCards';
import ProductsNavigation from '../Components/ProductsNavigation';
// import DeliveryContext from '../Context/DeliveryContext';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const totalPrice = 0;
  return (
    <div>
      <ProductsNavigation />
      <ProductsCards />
      <button
        className="cart_button"
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ navigate('/customer/checkout') }
      >
        Ver Carrinho:
        { totalPrice }
      </button>
    </div>
  );
}
