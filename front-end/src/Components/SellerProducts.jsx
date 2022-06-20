import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';

export default function SellerProducts() {
  const { fetchSellerSales, sales } = useContext(DeliveryContext);

  const getInfos = async () => {
    const { token, id } = JSON.parse(localStorage.getItem('user'));
    await fetchSellerSales(token, id);
  };

  useEffect(() => {
    getInfos();
  }, []);

  const treatDate = (date, id) => {
    const noon = 12;
    const magic = 10;
    const rightFormat = new Date(date);
    const dd = rightFormat.getDate();
    const mm = rightFormat.getMonth() + 1;
    const yyyy = rightFormat.getFullYear();
    const hh = rightFormat.getHours();
    const min = rightFormat.getMinutes();
    const sec = rightFormat.getSeconds();
    return (
      <div className="date">
        <span data-testid={ `seller_orders__element-order-date-${id}` }>
          {`${dd < magic ? `0${dd}` : dd}/${mm < magic ? `0${mm}` : mm}/${yyyy}`}
        </span>
        <span>{`${hh}:${min}:${sec}${hh >= noon ? 'PM' : 'AM'}`}</span>
      </div>
    );
  };

  return (
    <div>
      <main className="sales-container">
        {sales.map(({ id, totalPrice, status, saleDate, deliveryAddress }) => (
          <Link
            key={ id }
            to={ `/seller/orders/${id}` }
            style={ { textDecoration: 'none', color: 'black' } }
          >
            <div className="seller-card">
              <div className="order">
                <span>Pedido</span>
                <span data-testid={ `seller_orders__element-order-id-${id}` }>
                  {id}
                </span>
              </div>
              <div
                className="status"
                data-testid={ `seller_orders__element-delivery-status-${id}` }
              >
                {status}
              </div>
              <div className="date-and-price">
                {treatDate(saleDate, id)}
                <span data-testid={ `seller_orders__element-card-price-${id}` }>
                  {totalPrice.replace('.', ',')}
                </span>
                <span
                  data-testid={ `seller_orders__element-card-address-${id}` }
                  className="address"
                >
                  {deliveryAddress}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
