import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import ProductsNavigation from '../Components/ProductsNavigation';
import DeliveryContext from '../Context/DeliveryContext';
import { orderTableItem, orderTableName,
  orderTableQt, orderTableRemove,
  orderTableTotal, orderTableUnitPrice } from '../services/dataTestids';
import { POST_SALE } from '../services/URLs';

export default function CustomerProducts() {
  const navigate = useNavigate();
  const [removeItem, setRemoveItem] = useState('');
  const [sellerId, setSellerId] = useState(2);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const { totalPrice,
    setTotalPrice, fetchSellers, sellers } = useContext(DeliveryContext);

  const cart = JSON.parse(localStorage.getItem('cart'));
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    fetchSellers();
    if (cart) {
      const total = cart.reduce(
        (acc, item) => acc + Number(item.price * item.quantity),
        0,
      );
      setTotalPrice(total.toFixed(2));
    }
    const newCart = cart.filter((product) => product.id !== removeItem);
    localStorage.setItem('cart', JSON.stringify(newCart));
    setRemoveItem('');
  }, [cart, fetchSellers, removeItem, setTotalPrice]);

  const completePurchase = async () => {
    const arrProducts = [];
    cart.map((sku)=>{
      const item = {productId: sku.id, quantity: sku.quantity}
      arrProducts.push(item);
    });
    const requestParam ={
      userId: user.id,
      sellerId,
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status: 'Pendente',
      arrProducts,
     }
     console.log(requestParam)
    const result = await axios({ method:'post', url:POST_SALE, data:requestParam });
    console.log(result)
    //navigate('/customer/checkout')
  }

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
            cart.map(({ id, name, price, quantity }, index) => (
              <tr key={ `${id}-${name}` }>
                <th
                  scope="row"
                  data-testid={ `${orderTableItem}${index}` }
                >
                  { index + 1 }
                </th>
                <td
                  data-testid={ `${orderTableName}${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `${orderTableQt}${index}` }
                >
                  { quantity }
                </td>
                <td
                  data-testid={ `${orderTableUnitPrice}${index}` }
                >
                  { (price).replace('.', ',') }
                </td>
                <td
                  data-testid={ `${orderTableTotal}${index}` }
                >
                  { (Number(price) * Number(quantity))
                    .toFixed(2).replace('.', ',') }
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    style={ { marginLeft: '10px' } }
                    data-testid={ `${orderTableRemove}${index}` }
                    type="button"
                    onClick={ () => setRemoveItem(id) }
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
          { totalPrice.replace('.', ',') }
        </span>
      </div>
      <div>
        <label htmlFor="vendedores" className="form-label mb-4 col">
          Vendedor
          <select
            name="vendedores"
            id="vendedores"
            data-testid="customer_checkout__select-seller"
            value= { sellerId }
            onChange= {({ target: { value } }) => setSellerId(value)}
            
          >
            {sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{seller.name}</option>
            ))}
          </select>
        </label>
        <label
          htmlFor="address"
          className="form-label mb-4 col"
        >
          Endereço
          <input
            type="text"
            name="address"
            id="address"
            data-testid="customer_checkout__input-address"
            value={ deliveryAddress }
            onChange= {({ target: { value } }) => setDeliveryAddress(value)}
          />
        </label>
        <label htmlFor="addressNumber" className="form-label mb-4 col">
          Número
          <input
            type="text"
            name="addressNumber"
            id="addressNumber"
            data-testid="customer_checkout__input-addressNumber"
            value={ deliveryNumber }
            onChange= {({ target: { value } }) => setDeliveryNumber(value)}
          />
        </label>
        <button
          className="btn btn-outline-primary"
          style={ { marginLeft: '10px' } }
          data-testid="customer_checkout__button-submit-order"
          type="button"
          onClick={() => completePurchase()}
        >
          FINALIZAR PEDIDO
        </button>
      </div>

    </div>
  );
}
