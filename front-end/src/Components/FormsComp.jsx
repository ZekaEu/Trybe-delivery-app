import React, { useState } from 'react';

export default function FormsComp() {
  const [isDisable, setDisable] = useState(true);
  const [isEmailValid, setEmailValid] = useState(false);
  const [isPasswordValid, setPasswordValid] = useState(false);

  const handleInputEmail = ({ target: { value } }) => {
    const email = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email.test(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleInputPassword = ({ target: { value } }) => {
    const minPassLength = 6;
    if (value.length >= minPassLength) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <form>
      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form1Example13">
          <input
            type="email"
            id="form1Example13"
            className="form-control form-control-lg"
            onChange={ (e) => handleInputEmail(e) }
          />
          Email address
        </label>
      </div>

      <div className="form-outline mb-4">
        <label className="form-label" htmlFor="form1Example23">
          <input
            type="password"
            id="form1Example23"
            className="form-control form-control-lg"
            onChange={ (e) => handleInputPassword(e) }
          />
          Password
        </label>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        id="sign-in"
        disabled={ !isEmailValid || !isPasswordValid }
      >
        Sign in
      </button>
      <div className="d-flex justify-content-around align-items-center mb-4">
        <a href="/register">Dont have an account? Register now!</a>
      </div>
    </form>
  );
}
