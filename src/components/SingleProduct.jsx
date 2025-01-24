import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DoAddToCart } from '../services/CartService';
import { toastMessageAndNavigate } from '../services/ToastMessage';
import { ProductById } from '../services/ProductService';

const SingleProduct = () => {
    const navigate = useNavigate();
    let { id } = useParams(); 
    const [item, setItem] = useState(null); 
    const [quantity, setQuantity] = useState(1); 

    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await ProductById(id);
                setItem(response.data); 
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const selectQuantity = (e) => {
        const value = e.target.value;
        if (value >= 1) setQuantity(value); 
    };
    const getUserData = () => {
        const user = sessionStorage.getItem('user');
        return user ? JSON.parse(user) : null;
      };
    const addToCart = async (e) =>{
        const user = getUserData();
        const addToCartData = {userId:user.id,productId:e.id,quantity}
        try{
            const response = await DoAddToCart(addToCartData);
            if(response.status === 200){
                toastMessageAndNavigate("Product added to cart successfully","success", 1000,"#",navigate)
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <>
            {item ? (
                <div className='itemPreview'>
                    <div className="image">
                      <img src={item.image} alt={item.model} />
                    </div>
                    <div className="description">
                        <h2 className="title">{item.company} {item.model}</h2>
                        <p className="descriptionContent">{item.description}</p>
                        <h1 className="itemPrice">Rs. {item.price} /-</h1>
                        <div className="buttons">
                            <input
                                type="number"
                                className='quantityselection'
                                value={quantity}
                                onChange={selectQuantity}
                            />
                            <button className='buynowbtn' onClick={()=>navigate(`/home/${item.id}/buy/${quantity}`)}>Buy Now</button>
                            <button className='addtocartbtn' onClick={() => addToCart(item)}>Add to cart</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading product details...</p>
            )}
        </>
    );
};

export default SingleProduct;
