
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LoginUriCall } from '../services/UserService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginRequest = { email, password };
    const response = await LoginUriCall(loginRequest);
    if(response){
      toastMessageAndNavigate("Login Successful", "success", 1000, "/home", navigate)
      const user = response.data;
      sessionStorage.setItem("user", JSON.stringify(user));
    }else{
      toastMessageAndNavigate("Login Failed", "error", 1000, "#", navigate)
    }
  };

  return (
    <div className="loginOutLine">
      <div className="loginDiv">
        <h1>Log In</h1>
        <input
          type="email"
          id="emailId"
          placeholder="Enter email id"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          id="passId"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn" onClick={handleLogin}>Login</button>
        <Link to={'/register'}>
          <button className="btn">Register</button>
        </Link>
        <button className="btn" style={{ color: 'red', fontSize: '20px' }} onClick={() => navigate("/admin/products")}>for Admin</button>
      </div>
    </div>
  );
};

export default Login;