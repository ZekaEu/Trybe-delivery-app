import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_PRODUCTS } from '../services/URLs';

export default function ProductsCards() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    await axios.get(GET_PRODUCTS)
      .then(({ data }) => setProducts(data));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="products-container">
      { products.map(({ id, name, price, urlImage }) => (
        <div key={ id } className="item">
          <span
            data-testid={ `customer_products__element-card-price-${id}` }
          >
            {price.replace('.', ',')}
          </span>
          <img
            src={ urlImage }
            alt={ name }
            data-testid={ `customer_products__img-card-bg-image-${id}` }
            className="product-img"
          />
          <div className="settings">
            <span
              className="product-name"
              data-testid={ `customer_products__element-card-title-${id}` }
            >
              { name }
            </span>
            <div className="container-quantity">
              <button
                className="quantity-button btn btn-outline-success"
                type="button"
                data-testid={ `customer_products__button-card-rm-item-${id}` }
              >
                -
              </button>
              <label htmlFor={ id }>
                <input
                  id={ id }
                  className="product-quantity"
                  type="number"
                  defaultValue="0"
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                />
              </label>
              <button
                className="quantity-button btn btn-outline-success"
                type="button"
                data-testid={ `customer_products__button-card-add-item-${id}` }
              >
                +
              </button>
            </div>
          </div>
        </div>
      )) }
    </main>
  );
}
