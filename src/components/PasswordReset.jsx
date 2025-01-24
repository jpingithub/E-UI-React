import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PasswordResetAPI } from '../services/UserService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const PasswordReset = () => {
    const navigate = useNavigate();

    const getUserData = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    var user = getUserData();
    const id = user.id;

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnteredPassword, setReEnteredPassword] = useState('');

    const cancelAction = () => {
        navigate("/info/profile");
    };

    const submitAction = async (event) => {
        event.preventDefault();
        if (oldPassword !== user.password) {
            alert("Incorrect password");
            return;
        }
    
        if (newPassword !== reEnteredPassword) {
            alert("New password and re-entered password do not match.");
            return;
        }
    
        const data = {
            id: id,
            password: newPassword
        };
    
        try {
            const response = await PasswordResetAPI(data);
            if (response.status === 200) {
                user.password = newPassword;
                sessionStorage.setItem("user", JSON.stringify(user));
                toastMessageAndNavigate("Password updated successfully","success", 1000,"/", navigate);
            } else {
                alert("Failed to update password.");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            alert("An error occurred while updating the password.");
        }
    };
    

    return (
        <form className="passwordUpdateOutline" onSubmit={submitAction}>
            <h1>Password Reset</h1>
            <input
                required
                type="password"
                placeholder="Old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                required
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
                required
                type="password"
                placeholder="Re-Enter new password"
                value={reEnteredPassword}
                onChange={(e) => setReEnteredPassword(e.target.value)}
            />
            <div className="buttons restbuttons">
                <button type="submit">Reset</button>
                <button type="reset" onClick={cancelAction}>Cancel</button>
            </div>
        </form>
    );
};

export default PasswordReset;
