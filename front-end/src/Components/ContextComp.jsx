import PropTypes from 'prop-types';
import React, { useState } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function ContextComp({ children }) {
  const [userInfos, setUserInfos] = useState([]);

  const getUserFromDb = (data) => {
    setUserInfos(data);
  };

  const state = {
    userInfos,
    getUserFromDb,
  };

  return (
    <DeliveryContext.Provider value={ state }>
      { children }
    </DeliveryContext.Provider>
  );
}

ContextComp.propTypes = {
  children: PropTypes.element.isRequired,
};
