import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductsNavigation from '../Components/ProductsNavigation';
import DeliveryContext from '../Context/DeliveryContext';


export default function CustomerProducts() {
  const [removeItem, setRemoveItem] = useState('');
  const { totalPrice, setTotalPrice, fetchSellers, sellers } = useContext(DeliveryContext);
  const cart = JSON.parse(localStorage.getItem('cart'));
  useEffect(()=> {
    fetchSellers();
    if (cart) {
      const totalPrice = cart.reduce(
        (acc, item) => acc + Number(item.price * item.quantity),
        0,
      );
      setTotalPrice(totalPrice.toFixed(2));
    }
    const newCart = cart.filter((product) => product.id !== removeItem);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setRemoveItem('');
  }, [removeItem])

  return (
    <div>
      <ProductsNavigation />
      <table className="table table-striped mt-4 align-middle">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
            <th scope="col">Remover item</th>
          </tr>
        </thead>
        <tbody>
          { cart.length !== 0 && (
            cart.map(({ id, name, price, urlImage, quantity }, index) => (
              <tr key={ `${id}-${name}` }>
                <th
                  scope="row"
                  data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
                >
                  { index + 1 }
                </th>
                <td
                  data-testid={ `customer_checkout__element-order-table-name-${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
                >
                  { quantity }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
                >
                  { price }
                </td>
                <td
                  data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
                >
                  { Number(price) * Number(quantity) }
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    style={ { marginLeft: '10px' } }
                    data-testid={ `customer_checkout__element-order-table-remove-${index}` }
                    type="button"
                    onClick={() => setRemoveItem(id)}
                  >
                    Remover
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div
        className="checkout_total_price"
        data-testid="customer_checkout__element-order-total-price"
      >
        Total: R$
        <span data-testid="customer_products__checkout-bottom-value">
          { totalPrice.toString().replace('.', ',') }
        </span>
      </div>
      <div >
        <label for="vendedores" className="form-label mb-4 col">Vendedor Responsável</label>
        <select name="vendedores" id="vendedores" data-testid="customer_checkout__select-seller">
          {sellers.map((seller) => 
            <option value={seller.id}>{seller.name}</option>
          )}
        </select>
        <label for="address" className="form-label mb-4 col">Endereço</label>
        <input type="text" name="address" id="address" data-testid="customer_checkout__input-address" />
        <label for="addressNumber" className="form-label mb-4 col">Número</label>
        <input type="text" name="addressNumber" id="addressNumber" data-testid="customer_checkout__input-addressNumber" />
        <button
          className="btn btn-outline-primary"
          style={ { marginLeft: '10px' } }
          data-testid={ `customer_checkout__button-submit-order` }
          type="button"
        >
          FINALIZAR PEDIDO
        </button>
      </div>

    </div>
  );
}
