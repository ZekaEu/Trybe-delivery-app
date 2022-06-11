import PropTypes from 'prop-types';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeliveryContext from '../Context/DeliveryContext';
import {
  CHECK_USER,
  CREATE_USER,
  GET_USERS,
  DELETE_USERS,
  GET_SELLER,
  GET_SALES,
} from '../services/URLs';

export default function ContextComp({ children }) {
  // const [userInfos, setUserInfos] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [sales, setSales] = useState([]);
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

  const fetchSellers = async () => {
    await axios.get(GET_SELLER).then(({ data }) => {
      setSellers([...data]);
    }).catch(({ message }) => {
      const msgTreated = treatMsg(message);
      setErrorMsg(msgTreated);
    });
  };

  const deleteUser = async (id) => {
    await axios.delete(`${DELETE_USERS}/${id}`).then(() => {
      console.log('Deleted User');
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
      localStorage.setItem('user', JSON.stringify(data));
      if (data.role !== 'administrator') return navigate('/customer/products');
      return navigate('/admin/manage');
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

  const fetchCreateUserAdmin = async ({ name, email, password, role }, token) => {
    await axios.post(CREATE_USER, {
      name,
      email,
      password,
      role,
    }, {
      headers: { Authorization: token },
    }).then(() => {
      console.log('Created User');
    })
      .catch(({ message }) => {
        const msgTreated = treatMsg(message);
        setErrorMsg(msgTreated);
      });
  };

  const fetchSales = async (token) => {
    await axios.get(GET_SALES, {
      headers: { Authorization: token },
    }).then(({ data }) => setSales(data))
      .catch(({ message }) => {
        const msgTreated = treatMsg(message);
        setErrorMsg(msgTreated);
      });
  };

  const state = {
    errorMsg,
    allUsers,
    totalPrice,
    sellers,
    sales,
    fetchAllUser,
    deleteUser,
    fetchUser,
    fetchCreateUser,
    fetchCreateUserAdmin,
    setTotalPrice,
    setSellers,
    fetchSellers,
    fetchSales,
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
