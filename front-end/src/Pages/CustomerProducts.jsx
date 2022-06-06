import React, { useContext, useEffect } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function CustomerProducts() {
  const { userInfos } = useContext(DeliveryContext);

  useEffect(() => {
    localStorage.setItem('login', JSON.stringify(userInfos));
  }, []);

  return (
    <div>CustomerProducts</div>
  );
}
