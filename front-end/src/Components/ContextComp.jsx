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
  GET_ORDER,
  GET_SALES,
  GET_SALE,
  GET_USER,
} from '../services/URLs';

export default function ContextComp({ children }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [sellers, setSellers] = useState([]);
  const [order, setOrder] = useState({});
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState({});
  const [seller, setSeller] = useState({});
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
      if (data.role === 'seller') return navigate('/seller/orders');
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

  const fetchOrder = async (id) => {
    await axios.get(`${GET_ORDER}${id}`).then(({ data }) => {
      setOrder({ ...data });
    });
  };

  const fetchSale = async (id) => {
    await axios.get(`${GET_SALE}${id}`).then(({ data }) => {
      setSale({ ...data });
    });
  };

  const fetchSeller = async (id) => {
    await axios.get(`${GET_USER}${id}`).then(({ data }) => {
      setSeller({ ...data });
    });
  };

  const fetchSales = async (token, id) => {
    await axios.get(GET_SALES, {
      headers: { Authorization: token },
    }).then(({ data }) => {
      console.log(data);
      setSales(data.filter((el) => el.userId === id));
    })
      .catch(({ message }) => {
        const msgTreated = treatMsg(message);
        setErrorMsg(msgTreated);
      });
  };

  const fetchSellerSales = async (token, id) => {
    await axios.get(GET_SALES, {
      headers: { Authorization: token },
    }).then(({ data }) => {
      setSales(data.filter((el) => el.sellerId === id));
    })
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
    order,
    sale,
    seller,
    fetchAllUser,
    deleteUser,
    fetchUser,
    fetchCreateUser,
    fetchCreateUserAdmin,
    setTotalPrice,
    setSellers,
    fetchSellers,
    fetchSellerSales,
    setOrder,
    fetchSales,
    fetchOrder,
    fetchSale,
    fetchSeller,
  };

  return (
    <DeliveryContext.Provider value={ state }>
      {children}
    </DeliveryContext.Provider>
  );
}

ContextComp.propTypes = {
  children: PropTypes.element.isRequired,
};
