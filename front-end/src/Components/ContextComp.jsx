import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';
import { CHECK_USER, CREATE_USER, GET_USERS, DELETE_USERS } from '../services/URLs';

export default function ContextComp({ children }) {
  // const [userInfos, setUserInfos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  const treatMsg = (msg) => {
    if (msg.includes('401')) return 'Email or Password Invalid';
    if (msg.includes('409')) return 'Email already in use';
    if (msg.includes('404')) return 'User not found! Please Sign up';
    return msg;
  };

  const fetchAllUser = async () => {
    await axios.get(GET_USERS).then(({ data }) => {
      setAllUsers([...data]);
    }).catch(({ message }) => {
      const msgTreated = treatMsg(message);
      setErrorMsg(msgTreated);
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(`${DELETE_USERS}/${id}`).then(({ data }) => {
      console.log(data);;
    }).catch(({ message }) => {
      const msgTreated = treatMsg(message);
      setErrorMsg(msgTreated);
    });
  };

  const fetchUser = async ({ email, password }) => {
    await axios.post(CHECK_USER, {
      email,
      password,
    }).then(({ data }) => {
      // setUserInfos(data);
      navigate('/customer/products');
      localStorage.setItem('user', JSON.stringify(data));
    }).catch(({ message }) => {
      const msgTreated = treatMsg(message);
      setErrorMsg(msgTreated);
    });
  };

  const fetchCreateUser = async ({ name, email, password, role }) => {
    await axios.post(CREATE_USER, {
      name,
      email,
      password,
      role,
    }).then(({ data }) => {
      // setUserInfos(data);
      localStorage.setItem('user', JSON.stringify(data));
      navigate('/customer/products');
    })
      .catch(({ message }) => {
        const msgTreated = treatMsg(message);
        setErrorMsg(msgTreated);
      });
  };

  const state = {
    errorMsg,
    allUsers,
    fetchAllUser,
    deleteUser,
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
