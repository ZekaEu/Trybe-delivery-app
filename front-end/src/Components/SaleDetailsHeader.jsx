import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';
import { sellerOrder } from '../services/dataTestids';

export default function OrderDetailsHeader() {
  const { fetchSale, sale, fetchSeller } = useContext(DeliveryContext);

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
      <h6
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { `${dd < magic ? `0${dd}` : dd}/${mm < magic ? `0${mm}` : mm}/${yyyy}` }
      </h6>
    );
  };

  useEffect(() => {
    fetchSeller(sale.sellerId);
  }, [sale.sellerId]);

  return (
    <div className="order-header-container">
      <div className="order-header">
        <h5
          data-testid="seller_order_details__element-order-details-label-order-id"
        >
          { `PEDIDO ${id}` }
        </h5>
        { Object.keys(sale) !== 0 && (
          <div className="order-header">
            { treatDate(sale.saleDate) }
            <h6>-</h6>
            <h6
              data-testid={ sellerOrder }
            >
              {sale.status}
            </h6>
          </div>
        )}
        <button
          type="button"
          data-testid="seller_order_details__button-preparing-check"
        >
          PREPARAR PEDIDO
        </button>
        <button
          type="button"
          data-testid="seller_order_details__button-dispatch-check"
          disabled
        >
          SAIU PARA ENTREGA
        </button>
      </div>
    </div>
  );
}
