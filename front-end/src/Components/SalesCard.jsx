import React from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function SalesCard() {
  const { fetchSales, sales } = useContext(DeliveryContext);

  useEffect(() => {
    fetchSales();
    console.log(sales);
  }, []);

  return (
    <div>
      Oi
    </div>
  )
}
