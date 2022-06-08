import React from 'react';
import RegisterCompAdmin from '../Components/RegisterCompAdmin';

export default function Admin() {
  return (
    <section
      className="vh-100 bg-image"
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <RegisterCompAdmin />
          </div>
        </div>
      </div>
    </section>
  );
}
