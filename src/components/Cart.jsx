import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeleteProductFromCart, GetUserCart } from '../services/CartService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const getUserData = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            const user = getUserData();
            if (user) {
                const response = await GetUserCart(user);
                if (response.status === 200 && response.data.length > 0) {
                    setItems(response.data);
                    setMessage(''); 
                    localStorage.removeItem("cartItems");
                    localStorage.setItem("cartItems",JSON.stringify(response.data));
                } else {
                    setMessage('No data found');
                    setItems([]); 
                    localStorage.removeItem("cartItems");
                }
            } else {
                setMessage('User not logged in');
                setItems([]);
            }
        };

        fetchCartItems();
    }, []);

    const deleteAction = async (itemId) => {
        const user = getUserData(); 
        if(user){
            const resultItems = await DeleteProductFromCart(user,items,itemId)
            toastMessageAndNavigate("Item deleted successfully","success", 1000,"/info/cart/",navigate)
            setItems(resultItems)
            
        }else{
            setMessage('User not logged in')
        }
    }

    return (
        <div className='tableoutline'>
            {message && <p className='errorMessage'>{message}</p>}
            {items.length > 0 ? (
                <>
                <table className='productstable' border={1} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Sub total</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => {
                            const subtotal = item.price * item.quantity;

                            return (
                                <tr key={item.id} className='cartitemrow'>
                                    <td><img src={item.image} alt="" className='imageToView'/></td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td> {subtotal.toFixed(2)}</td>
                                    <td>
                                        <button 
                                            className="deleteBtn" 
                                            onClick={() => deleteAction(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <button className='checkoutbtn' onClick={()=>navigate(`/home/${0}/buy/${0}`)}>Checkout</button>
                </>
            ) : (
                !message && <p className='errorMessage'>No items in the cart</p>
            )}
        </div>
    );
};

export default Cart;
