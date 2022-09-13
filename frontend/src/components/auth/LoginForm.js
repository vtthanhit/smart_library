import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import AlertMessage from '../layout/AlertMessage';

function LoginForm() {
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: '',
    password: '',
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = event => setLoginForm({
    ...loginForm,
    [event.target.name]: event.target.value,
  });

  const login = async event => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
				setAlert({ type: 'danger', message: loginData.message });
        setTimeout(() => setAlert(null), 3000);
			}
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-root-bg">
      <div className="container mx-auto">
        <div className="flex basis-full w-full min-h-screen items-center justify-center overflow-hidden pb-6">
          <div className="max-w-400 relative w-full before:w-148 before:h-148 before:content-[' '] before:absolute before:top-a40 before:right-a40 before:bg-primary before:opacity-50 after:w-243 after:h-240 after:content-[' '] after:absolute after:bottom-a68 after:left-a46 after:bg-primary after:opacity-50">
            <div className="z-1 bg-clip-padding shadow-my relative flex flex-col min-w-0 bg-white border-solid border-border-color border-0 rounded-lg">
              <div className="flex-auto p-6">
                {/* Logo */}
                <div className="mb-10 flex flex-grow-0 flex-shrink-0 overflow-hidden leading-none min-h-1 items-center justify-center">
                  <a href="/" className="flex items-center">
                    <span className="text-3xl tracking-tighter flex-shrink-0 opacity-100">Smart Library</span>
                  </a>
                </div>
                {/* End logo */}
                <h4 className="mb-2">Chào mừng đến với Smart Library 👋</h4>
                <p className="mb-4">Vui lòng đăng nhập và bắt đầu trải nghiệm</p>
                <form id="formAuthentication" className="mb-4" onSubmit={login}>
                  <AlertMessage info={alert} />
                  <div className="mb-4">
                    <label htmlFor="username" className="mb-2 text-xs uppercase font-medium text-form">Username</label>
                    <input
                      type="text"
                      className="form-input block w-full border-border-color  bg-clip-padding rounded-md focus:border-primary"
                      id="username"
                      name="username"
                      placeholder="Nhập username"
                      required
                      autoFocus
                      value={username}
                      onChange={onChangeLoginForm}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="mb-2 text-xs uppercase font-medium text-form" htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      className="form-input block w-full border-border-color  bg-clip-padding rounded-md focus:border-primary"
                      name="password"
                      placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                      required
                      aria-describedby="password"
                      value={password}
                      onChange={onChangeLoginForm}
                    />
                  </div>
                  <div className="mb-4">
                    <button className="bg-primary-impo border-primary text-white w-full font-normal leading-normal text-lg p-btn rounded-md" type="submit">Đăng nhập</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm