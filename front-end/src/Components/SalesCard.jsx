import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  const treatDate = (date, id) => {
    const noon = 12;
    const rightFormat = new Date(date);
    const dd = rightFormat.getDate();
    const mm = rightFormat.getMonth() + 1;
    const yyyy = rightFormat.getFullYear();
    const hh = rightFormat.getHours();
    const min = rightFormat.getMinutes();
    const sec = rightFormat.getSeconds();
    return (
      <div className="date">
        <span data-testid={ `customer_orders__element-order-date-${id}` }>
          { `${dd}/${mm}/${yyyy}` }
        </span>
        <span>
          { `${hh}:${min}:${sec}${hh >= noon ? 'PM' : 'AM'}` }
        </span>
      </div>
    );
  };

  return (
    <div>
      <main className="sales-container">
        {sales.map(({ id, totalPrice, status, saleDate }) => (
          <Link
            key={ id }
            to={ `/customer/orders/${id}` }
            style={ { textDecoration: 'none', color: 'black' } }
          >
            <div className="sale-card">
              <div className="order">
                <span>Pedido</span>
                <span data-testid={ `customer_orders__element-order-id-${id}` }>
                  {id}
                </span>
              </div>
              {/* { console.log(new Date(saleDate).getDate()) } */}
              <div
                className="status"
                data-testid={ `customer_orders__element-delivery-status-${id}` }
              >
                {status}
              </div>
              <div className="date-and-price">
                { treatDate(saleDate, id) }
                <span data-testid={ `customer_orders__element-card-price-${id}` }>
                  {totalPrice}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </main>
    </div>
  );
}
