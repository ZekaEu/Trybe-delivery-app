import React, { useContext, useState } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function FormsComp() {
  const [isEmailValid, setEmailValid] = useState(false);
  const [inputEmail, setEmail] = useState('');
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [inputPassword, setPassword] = useState('');
  const { fetchUser, errorMsg } = useContext(DeliveryContext);

  const handleInputEmail = ({ target: { value } }) => {
    setEmail(value);
    const email = /.+@.+\.com/i;
    if (email.test(value)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleInputPassword = ({ target: { value } }) => {
    setPassword(value);
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
            data-testid="common_login__input-email"
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
            data-testid="common_login__input-password"
            className="form-control form-control-lg"
            onChange={ (e) => handleInputPassword(e) }
          />
          Password
        </label>
      </div>
      <span data-testid="common_login__element-invalid-email">
        { errorMsg || null }
      </span>
      <button
        type="button"
        className="btn btn-primary btn-lg btn-block"
        data-testid="common_login__button-login"
        id="sign-in"
        disabled={ !isEmailValid || !isPasswordValid }
        onClick={ () => fetchUser({ email: inputEmail, password: inputPassword }) }
      >
        Sign in
      </button>
      <div className="d-flex justify-content-around align-items-center mb-4">
        <a href="/register">
          <button
            type="button"
            data-testid="common_login__button-register"
            className="btn btn-outline-dark register-button"
          >
            Dont have an account? Register now!
          </button>
        </a>
      </div>
    </form>
  );
}
