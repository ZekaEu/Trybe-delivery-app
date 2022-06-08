import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsCards from '../Components/ProductsCards';
import ProductsNavigation from '../Components/ProductsNavigation';
import DeliveryContext from '../Context/DeliveryContext';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const { totalPrice } = useContext(DeliveryContext);

  return (
    <div>
      <ProductsNavigation />
      <ProductsCards />
      <button
        className="cart_button"
        type="button"
        data-testid="customer_products__button-cart"
        disabled={ totalPrice === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        Ver Carrinho:
        <span data-testid="customer_products__checkout-bottom-value">
          { totalPrice.toString().replace('.', ',') }
        </span>
      </button>
    </div>
  );
}
