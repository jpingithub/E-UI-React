import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UpdateUserProfile } from '../services/UserService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const UserProfile = () => {
  const navigate = useNavigate();

  const getUserData = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const [user, setUser] = useState(getUserData());
  const [email, setEmail] = useState(user ? user.email : '');
  const [phone, setPhone] = useState(user ? user.phoneNumber : '');
  const [image, setImage] = useState(user ? user.profileImage : '');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePhone = (e) => {
    setPhone(e.target.value);
  };

  const changeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateChanges = async (e) => {
    e.preventDefault();
    const updatedUser = {
      ...user,
      email,
      phoneNumber: phone,
      profileImage: image,
    };

    const response = await UpdateUserProfile(user, updatedUser)
    if (response.status === 200) {
      toastMessageAndNavigate("Profile updated successfully","success", 1000,"#",navigate)
      sessionStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
    }
  };

  const navigateToUpdatePassword = () => {
    navigate("/info/password-reset");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    setUser(getUserData());
  }, []);

  if (!user) {
    return <div className='errorMessage'>No user data available</div>;
  }

  return (
    <form className="profileoutline" onSubmit={updateChanges}>
      <img src={image} alt="Profile" className="profileimage" />
      <input type="file" onChange={changeImage} />
      <h2 className="username">{user.userName}</h2>
      <div className="details">
        <input
          type="email"
          value={email}
          onChange={changeEmail}
          placeholder="Enter email"
        />
        <input
          type="tel"
          value={phone}
          onChange={changePhone}
          placeholder="Enter phone number"
        />
      </div>
      <button className="updateprofile" type="submit">Update Changes</button>
      <div className='buttons'>
        <button className='updateprofile passwordupdate' type="button" onClick={navigateToUpdatePassword}>Update Password</button>
        <button className='updateprofile logOutBtn' type="button" onClick={handleLogout}>Log Out</button>
      </div>
    </form>
  );
};

export default UserProfile;
