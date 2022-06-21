import { useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../Context/DeliveryContext';
import SellerNavigation from '../Components/SellerNavigation';
import SaleDetailsHeader from '../Components/SaleDetailsHeader';
import {
  saleItemNumber,
  saleName,
  saleQuantity,
  saleUnitPrice,
  saleSubTotal,
} from '../services/dataTestids';

export default function OrderDetails() {
  const { fetchOrder, order } = useContext(DeliveryContext);

  const { id } = useParams();
  useEffect(() => {
    fetchOrder(id).then(() => console.log(order));
  }, [order.id]);

  return (
    <div>
      <SellerNavigation />
      <h5>Detalhes do pedido</h5>
      { Object.keys(order).length !== 0 && (
        <SaleDetailsHeader />
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
                  data-testid={ `${saleItemNumber}${index}` }
                >
                  { index + 1 }
                </th>
                <td
                  data-testid={ `${saleName}${index}` }
                >
                  { name }
                </td>
                <td
                  data-testid={ `${saleQuantity}${index}` }
                >
                  { quantity }
                </td>
                <td
                  data-testid={ `${saleUnitPrice}${index}` }
                >
                  { (price).replace('.', ',') }
                </td>
                <td
                  data-testid={ `${saleSubTotal}${index}` }
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
        data-testid="seller_order_details__element-order-total-price"
      >
        Total: R$
        <span data-testid="seller_order_details__element-order-total-price">
          { Object.keys(order).length && order.totalPrice.replace('.', ',') }
        </span>
      </div>
    </div>
  );
}
