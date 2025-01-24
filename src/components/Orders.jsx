import React, { useState, useEffect } from 'react';
import { AllPurchases } from '../services/PurchasesService';

const Orders = () => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');

    const getUserData = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    useEffect(() => {
        const fetchData = async () => {
            const user = getUserData();
            if (user) {
                const response = await AllPurchases(user)
                if (response.status === 200 && response.data.length > 0) {
                    setItems(response.data);
                    setMessage('');
                } else {
                    setMessage('No orders found');
                    setItems([]);
                }
            } else {
                setMessage('User not logged in');
                setItems([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='tableoutline'>
            {message && (
                <p className='errorMessage'>
                    {message}
                </p>
            )}
            {items.length > 0 ? (
                <table className='productstable' border={1} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub total</th>
                            <th>Address</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id} className='cartitemrow'>
                                <td>
                                    <img src={item.image} alt={item.productName} className='imageToView' />
                                </td>
                                <td>{item.productName}</td>
                                <td>{item.price}</td>
                                <td>{item.quantity}</td>
                                <td>{item.total.toFixed(2)}</td>
                                <td>{item.address}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                !message && <p className='errorMessage'>No items in the orders</p>
            )}
        </div>
    );
};

export default Orders;
