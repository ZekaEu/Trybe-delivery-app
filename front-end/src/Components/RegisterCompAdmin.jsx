import React, { useContext, useState } from 'react';
import DeliveryContext from '../Context/DeliveryContext';

export default function RegisterComp() {
  const [isNameValid, setNameValid] = useState(false);
  const [isEmailValid, setEmailValid] = useState(false);
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputRole, setInputRole] = useState('customer');
  const [isPasswordValid, setPasswordValid] = useState(false);
  const { fetchAllUser, fetchCreateUserAdmin, errorMsg } = useContext(DeliveryContext);

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

  const createUser = async (user) => {
    await fetchCreateUserAdmin(user);
    await fetchAllUser();
    setInputName('');
    setInputEmail('');
    setInputPassword('');
    setInputRole('customer');
  }

  return (
    <div className="card-body p-3 container-form shadow-box">
      <h2 className="text-uppercase mb-2">Register new user</h2>
      <form className="row">
        <div className="col">
          <label className="form-label" htmlFor="form3Example1cg">
            <input
              type="text"
              id="form3Example1cg"
              className="form-control form-control-lg"
              value={ inputName }
              data-testid="admin_manage__input-name"
              onChange={ ({ target: { value } }) => handleRegisterName(value) }
            />
            Your Name
          </label>
        </div>

        <div className="form-outline mb-4 col">
          <label className="form-label" htmlFor="form3Example3cg">
            <input
              type="email"
              id="form3Example3cg"
              className="form-control form-control-lg"
              value={ inputEmail }
              data-testid="admin_manage__input-email"
              onChange={ ({ target: { value } }) => handleRegisterEmail(value) }
            />
            Your Email
          </label>
        </div>

        <div className="form-outline mb-4 col">
          <label className="form-label" htmlFor="form3Example4cg">
            <input
              type="password"
              id="form3Example4cg"
              value={ inputPassword }
              data-testid="admin_manage__input-password"
              className="form-control form-control-lg"
              onChange={ ({ target: { value } }) => handleRegisterPassword(value) }
            />
            Password
          </label>
        </div>

        <div className="form-outline mb-4 col">
          <label className="form-label" htmlFor="form3Example4cg">
            <select
              className="form-control form-control-lg form-select"
              value={ inputRole }
              data-testid="admin_manage__select-role"
              onChange={ ({ target: { value } }) => setInputRole(value) }
            >
              <option>customer</option>
              <option>seller</option>
              <option>administrator</option>
            </select>
            Role
          </label>
        </div>
        <div className="col">
          <button
            type="button"
            className="btn btn-primary btn-block btn-lg gradient-custom-4 text-body"
            data-testid="admin_manage__button-register"
            style={ { color: 'white' } }
            disabled={ !isEmailValid || !isNameValid || !isPasswordValid }
            onClick={ () => createUser({
              name: inputName,
              email: inputEmail,
              password: inputPassword,
              role: inputRole,
            }) }
          >
            Register
          </button>
        </div>
      </form>
      <span
        data-testid="common_register__element-invalid_register"
      >
        { errorMsg || null }
      </span>
    </div>
  );
}
