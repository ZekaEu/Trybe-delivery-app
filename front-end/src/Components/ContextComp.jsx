import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';
import { CHECK_USER, CREATE_USER } from '../services/URLs';

export default function ContextComp({ children }) {
  const [userInfos, setUserInfos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  const treatMsg = (msg) => {
    if (msg.includes('401')) return 'Email or Password Invalid';
    if (msg.includes('409')) return 'Email already in use';
    return msg;
  };

  const fetchUser = async ({ email, password }) => {
    await axios.post(CHECK_USER, {
      email,
      password,
    }).then(({ data }) => {
      setUserInfos(data);
      navigate('/customer/products');
      console.log(data);
    }).catch(({ message }) => {
      const msgTreated = treatMsg(message);
      setErrorMsg(msgTreated);
      console.log(message);
    });
  };

  const fetchCreateUser = async ({ name, email, password, role }) => {
    await axios.post(CREATE_USER, {
      name,
      email,
      password,
      role,
    }).then(({ data }) => {
      fetchUser({ email: data.email, password: data.password });
    })
      .catch(({ message }) => {
        const msgTreated = treatMsg(message);
        setErrorMsg(msgTreated);
      });
  };

  const state = {
    userInfos,
    errorMsg,
    fetchUser,
    fetchCreateUser,
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
