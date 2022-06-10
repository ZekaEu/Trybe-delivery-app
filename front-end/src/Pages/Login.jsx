import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormsComp from '../Components/FormsComp';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogged = JSON.parse(localStorage.getItem('user'));
    if (isLogged) navigate('/customer/products');
  }, []);

  return (
    <section className="vh-100">
      <h2 className="app-title">Delivery App</h2>
      <div className="container py-5">
        <div className="row d-flex align-items-center justify-content-around">
          <div className="col-md-8 col-lg-7 col-xl-6 img-container">
            <img
              src=""
              className="img-fluid"
              alt="Delivery"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <FormsComp />
          </div>
        </div>
      </div>
    </section>
  );
}
