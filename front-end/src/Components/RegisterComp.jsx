import React from 'react';

export default function RegisterComp() {
  return (
    <div className="card-body p-5 container-form">
      <h2 className="text-uppercase text-center mb-5">Create an account</h2>
      <form>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example1cg">
            <input
              type="text"
              id="form3Example1cg"
              className="form-control form-control-lg"
            />
            Your Name
          </label>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example3cg">
            <input
              type="email"
              id="form3Example3cg"
              className="form-control form-control-lg"
            />
            Your Email
          </label>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cg">
            <input
              type="password"
              id="form3Example4cg"
              className="form-control form-control-lg"
            />
            Password
          </label>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cdg">
            <input
              type="password"
              id="form3Example4cdg"
              className="form-control form-control-lg"
            />
            Repeat your password
          </label>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
            style={ { color: 'white' } }
          >
            Register
          </button>
        </div>

        <p className="text-center text-muted mt-5 mb-0">
          Have already an account?
          {' '}
          <a href="/login" className="fw-bold text-body">
            <u>Login here</u>
          </a>
        </p>
      </form>
    </div>
  );
}
