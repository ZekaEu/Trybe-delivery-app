import React from 'react';
import ProductsCards from '../Components/ProductsCards';
import ProductsNavigation from '../Components/ProductsNavigation';
// import DeliveryContext from '../Context/DeliveryContext';

export default function CustomerProducts() {
  return (
    <div>
      <ProductsNavigation />
      <ProductsCards />
    </div>
  );
}
