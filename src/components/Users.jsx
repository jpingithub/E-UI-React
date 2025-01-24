import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AllUsers } from '../services/UserService';

const Users = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(""); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await AllUsers();
                if (response.status === 200) {
                    setData(response.data);
                    setError(""); 
                } else {
                    setError("No users found.");
                    setData([]); 
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Error fetching data");
                setData([]); 
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:9000/users/${id}`);
            if (response.status === 200) {
                setData(data.filter((user) => user.id !== id));
            } else {
                setError("Failed to delete the user.");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            setError("Error deleting user");
        }
    };

    return (
        <div className='tableoutline'>
            <div className="productstableheading">
                <h2 className="title">Customers</h2>
            </div>
            {error && <p>{error}</p>} 
            <table className='productstable' border={1} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}> 
                            <td>{item.id}</td>
                            <td><img src={item.profileImage} alt={`Profile of ${item.userName}`} width={50} height={50} /></td> {/* Added alt text and dimensions */}
                            <td>{item.userName}</td>
                            <td>{item.email}</td>
                            <td>{item.phoneNumber}</td>
                            <td><button className='deleteBtn' onClick={() => handleDelete(item.id)}>Delete</button></td> {/* Handle delete click */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Users;
