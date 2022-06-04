import React, { useContext, useState } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function RegisterComp() {
  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputName, setInputName] = useState('');
  const [isPasswordValid, setPasswordValid] = useState(false);
  const { fetchCreateUser, errorMsg } = useContext(DeliveryContext);

  const handleRegisterName = (userName) => {
    setInputName(userName);
    const nameMinLength = 12;
    if (userName.length >= nameMinLength) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleRegisterEmail = (email) => {
    setInputEmail(email);
    const emailR = /.+@.+\.com/i;
    if (emailR.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  const handleRegisterPassword = (password) => {
    setInputPassword(password);
    const minPassLength = 6;
    if (password.length >= minPassLength) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  return (
    <div className="card-body p-5 container-form shadow-box">
      <h2 className="text-uppercase text-center mb-5">Create an account</h2>
      <form>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example1cg">
            <input
              type="text"
              id="form3Example1cg"
              className="form-control form-control-lg"
              data-testid="common_register__input-name"
              onChange={ ({ target: { value } }) => handleRegisterName(value) }
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
              data-testid="common_register__input-email"
              onChange={ ({ target: { value } }) => handleRegisterEmail(value) }
            />
            Your Email
          </label>
        </div>

        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form3Example4cg">
            <input
              type="password"
              id="form3Example4cg"
              data-testid="common_register__input-password"
              className="form-control form-control-lg"
              onChange={ ({ target: { value } }) => handleRegisterPassword(value) }
            />
            Password
          </label>
        </div>
        <span
          data-testid="common_register__element-invalid_register"
        >
          { errorMsg || null }
        </span>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
            data-testid="common_register__button-register"
            style={ { color: 'white' } }
            disabled={ !isEmailValid || !isNameValid || !isPasswordValid }
            onClick={ () => fetchCreateUser({
              name: inputName,
              email: inputEmail,
              password: inputPassword,
              role: 'Customer',
            }) }
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
