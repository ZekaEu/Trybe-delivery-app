import React from 'react';
import RegisterComp from '../Components/RegisterComp';

export default function Register() {
  return (
    <section
      className="vh-100 bg-image"
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <RegisterComp />
          </div>
        </div>
      </div>
    </section>
  );
}
