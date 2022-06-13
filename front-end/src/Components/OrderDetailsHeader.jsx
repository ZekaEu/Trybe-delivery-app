import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';
import {
  buttonCheck,
  deliveryStatus,
  orderDate,
  orderId,
  sellerName,
} from '../services/dataTestids';

export default function OrderDetailsHeader() {
  const { fetchSale, sale, fetchSeller, seller } = useContext(DeliveryContext);

  const { id } = useParams();

  useEffect(() => {
    fetchSale(id);
  });

  const treatDate = (date) => {
    const magic = 10;
    const rightFormat = new Date(date);
    const dd = rightFormat.getDate();
    const mm = rightFormat.getMonth() + 1;
    const yyyy = rightFormat.getFullYear();
    return (
      <span data-testid={ orderDate }>
        { `${dd < magic ? `0${dd}` : dd}/${mm < magic ? `0${mm}` : mm}/${yyyy}` }
      </span>
    );
  };

  useEffect(() => {
    fetchSeller(sale.sellerId);
  }, [sale.sellerId]);

  return (
    <div className="order-header-container">
      <div className="order-header">
        <h5 data-testid={ orderId }>
          { `PEDIDO ${id};` }
        </h5>
        <span>P.Vend:</span>
        { Object.keys(seller) && (
          <span data-testid={ sellerName }>
            { seller.name }
          </span>
        )}
        { Object.keys(sale) !== 0 && (
          <div className="order-header">
            { treatDate(sale.saleDate) }
            <span data-testid={ deliveryStatus }>
              {sale.status}
            </span>
          </div>
        )}
        <button
          type="button"
          data-testid={ buttonCheck }
          disabled
        >
          MARCAR COMO ENTREGUE
        </button>
      </div>
    </div>
  );
}
