import { useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import ProductsNavigation from '../Components/ProductsNavigation';
import DeliveryContext from '../Context/DeliveryContext';
import OrderDetailsHeader from '../Components/OrderDetailsHeader';
import {
  itemName,
  itemNumber,
  itemQuantity,
  subTotal,
  unitPrice,
  detailTotalPrice,
} from '../services/dataTestids';

export default function OrderDetails() {
  const { fetchOrder, order } = useContext(DeliveryContext);

  const { id } = useParams();
  useEffect(() => {
    fetchOrder(id).then(() => console.log(order));
  }, [order.id]);

  return (
    <div>
      {/* { console.log(order) } */}
      <ProductsNavigation />
      <h5>Detalhes do pedido</h5>
      { Object.keys(order).length !== 0 && (
        <OrderDetailsHeader />
      )}
      <table className="table table-striped mt-4 align-middle">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Quantidade</th>
            <th scope="col">Valor Unitário</th>
            <th scope="col">Sub-total</th>
          </tr>
        </thead>
        <tbody>
          { Object.keys(order).length !== 0 && (
            order.products.map(({ name, price, quantity }, index) => (
              <tr key={ `${name}` }>
                <th
                  scope="row"
                  data-testid={ `${itemNumber}${index}` }
                >
                  { index + 1 }
                </th>
                <td
                  data-testid={ `${itemName}${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `${itemQuantity}${index}` }
                >
                  { quantity }
                </td>
                <td
                  data-testid={ `${unitPrice}${index}` }
                >
                  { (price).replace('.', ',') }
                </td>
                <td
                  data-testid={ `${subTotal}${index}` }
                >
                  { (Number(price) * Number(quantity))
                    .toFixed(2).replace('.', ',') }
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div
        className="checkout_total_price d-flex justify-content-center"
        data-testid={ detailTotalPrice }
      >
        Total: R$
        <span data-testid={ detailTotalPrice }>
          { Object.keys(order).length && order.totalPrice.replace('.', ',') }
        </span>
      </div>
    </div>
  );
}
