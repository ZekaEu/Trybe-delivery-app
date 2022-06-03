import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import DeliveryContext from '../Context/DeliveryContext';
import { CHECK_USER } from '../services/URLs';

export default function ContextComp({ children }) {
  const [userInfos, setUserInfos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchUser = async ({ email, password }) => {
    await axios.post(CHECK_USER, {
      email,
      password,
    }).then(({ data }) => {
      setUserInfos(data);
    }).catch(({ message }) => {
      const msgTreated = message.includes('401') ? 'Email or Password Invalid' : message;
      setErrorMsg(msgTreated);
      console.log(message);
    });
  };

  const state = {
    userInfos,
    errorMsg,
    fetchUser,
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
