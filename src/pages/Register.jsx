import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/UserService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    phoneNumber: '',
    profileImage: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await registerUser(formData)
    if (response.status === 200) toastMessageAndNavigate("Registration success", "success", 1000, "/", navigate)
    else if (response.status === 400) toastMessageAndNavigate("User already registered with email", "warning", 2000, "#", navigate)
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="loginOutLine">
      <form onSubmit={handleSubmit} className='loginDiv'>
        <h1>Registration</h1>
        <input
          type="text"
          name='userName'
          placeholder='Enter user name'
          pattern='^(?!.*\s{2,})[a-zA-Z0-9_ ]{3,15}$'
          value={formData.userName}
          onChange={handleChange}
          required
          minLength="3"
        />
        <input
          type="email"
          name='email'
          placeholder='Enter email'
          value={formData.email}
          onChange={handleChange}
          required
          pattern='/^[a-zA-Z0-9._%+-]{3,30}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/'
        />
        <input
          type={showPassword ? 'text' : 'password'}
          name='password'
          placeholder='Enter password'
          value={formData.password}
          onChange={handleChange}
          required
          minLength="5"
          maxLength="12"
          pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z@$!%*?&0-9]{5,12}$"
        />
        <span className='eyeSymbol' onClick={togglePasswordVisibility}>
          {showPassword ? '👁️' : '👁️‍🗨️'}
        </span>
        <input
          type="tel"
          name='phoneNumber'
          placeholder='Enter phone'
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          pattern="^\d{10}$"
        />
        <input
          type="file"
          name='profileImage'
          accept='image/*'
          onChange={handleChange}
        />
        <button className="btn" type='submit'>Register</button>
        <Link to={'/'}><button className="btn">Login</button></Link>
      </form>
    </div>
  );
}

export default Register;
