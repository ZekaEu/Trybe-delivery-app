import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { GET_PRODUCTS } from '../services/URLs';

export default function ProductsCards() {
  const [products, setProducts] = useState([]);
  const [arrQt, setArrQt] = useState([]);

  const fetchProducts = async () => {
    await axios.get(GET_PRODUCTS)
      .then(({ data }) => {
        const element = [];
        for (let i = 0; i < data.length; i += 1) {
          element.push(0);
        }
        setArrQt(element);
        setProducts(data);
      });
  };

  const updateStorage = ({ id, name, price, urlImage, quantity }) => {
    const product = { id, name, price, urlImage, quantity };
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
      localStorage.setItem('cart', JSON.stringify([product]));
    } else {
      const found = cart.find((obj) => obj.id === id);
      if (found) {
        found.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  };

  const decreaseQuantity = ({ i, id, name, price, urlImage }) => {
    if (arrQt[i] - 1 < 0) {
      arrQt[i] = 0;
    } else {
      arrQt[i] -= 1;
    }
    setArrQt([...arrQt]);
    updateStorage({ id, name, price, urlImage, quantity: arrQt[i] });
    console.log(arrQt);
  };

  const increaseQuantity = ({ i, id, name, price, urlImage }) => {
    arrQt[i] += 1;
    setArrQt([...arrQt]);
    updateStorage({ id, name, price, urlImage, quantity: arrQt[i] });
    console.log(arrQt);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <main className="products-container">
      { products.map(({ id, name, price, urlImage }, i) => (
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
                name={ id }
                data-testid={ `customer_products__button-card-rm-item-${id}` }
                onClick={ () => decreaseQuantity({ i, id, name, price, urlImage }) }
              >
                -
              </button>
              <label htmlFor={ id }>
                <input
                  id={ id }
                  className="product-quantity"
                  type="number"
                  onChange={ ({ target: { value } }) => {
                    arrQt[i] = Number(value);
                    setArrQt([...arrQt]);
                    updateStorage({ id, name, price, urlImage, quantity: arrQt[i] });
                  } }
                  value={ arrQt[i] }
                  data-testid={ `customer_products__input-card-quantity-${id}` }
                />
              </label>
              <button
                className="quantity-button btn btn-outline-success"
                type="button"
                data-testid={ `customer_products__button-card-add-item-${id}` }
                onClick={ () => increaseQuantity({ i, id, name, price, urlImage }) }
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
