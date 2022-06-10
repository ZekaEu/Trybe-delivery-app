import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function SalesCard() {
  const { fetchSales, sales } = useContext(DeliveryContext);
  // const [mockSales, setMockSales] = useState([
  //   {
  //     id: 1,
  //     totalPrice: 53.24,
  //     status: 'Preparando',
  //     saleDate: '09/06/2022',
  //   },
  //   {
  //     id: 2,
  //     totalPrice: 123.56,
  //     status: 'Pendente',
  //     saleDate: '09/06/2022',
  //   },
  // ]);

  const getInfos = async () => {
    const { token } = JSON.parse(localStorage.getItem('user'));
    await fetchSales(token);
  };

  useEffect(() => {
    getInfos();
  }, []);

  return (
    <div>
      <main className="sales-container">
        { sales.map(({ id, totalPrice, status, saleDate }) => (
          <div key={ id } className="sale-card">
            <div className="order">
              <span>Pedido</span>
              <span data-testid={ `customer_orders__element-order-id-${id}` }>
                { id }
              </span>
            </div>
            {/* { console.log(new Date(saleDate).toLocaleString().split(' ')) } */}
            <div
              className="status"
              data-testid={ `customer_orders__element-delivery-status-${id}` }
            >
              {status}
            </div>
            <div className="date-and-price">
              <span data-testid={ `customer_orders__element-order-date-${id}` }>
                {new Date(saleDate).toLocaleString()}
              </span>
              <span data-testid={ `customer_orders__element-card-price-${id}` }>
                {totalPrice}
              </span>
            </div>
          </div>
        )) }
      </main>
    </div>
  );
}
