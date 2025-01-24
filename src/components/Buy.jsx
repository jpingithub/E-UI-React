
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { Purchase } from '../services/PurchasesService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const Buy = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobile, setMobile] = useState('');
  const [products, setProducts] = useState([]);
  let { id, quantity } = useParams();

  useEffect(() => {
    if (id === '0' && quantity === '0') {  
      const storedProducts = JSON.parse(localStorage.getItem('cartItems'));
      if (storedProducts) {
        setProducts(storedProducts);
      }
    } else {
      setProducts([{ id, quantity }]);
    }
  }, [id, quantity]);

  const handleAddressChange = (e) => setAddress(e.target.value);
  const handlePincodeChange = (e) => setPincode(e.target.value);
  const handleMobileChange = (e) => setMobile(e.target.value);

  const getUserData = () => {
    const user = sessionStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = getUserData();

    if (user) {
      const data = products.map(product => ({
        address,
        pincode,
        mobileNumber: mobile,
        productId: product.id,
        quantity: product.quantity,
        userId: user.id
      }));

      const responses = [];
      for(const payload of data){
        const response = await Purchase(payload);
        responses.push(response)
      }
      if (responses.every(res => res.status === 200)) {
        toastMessageAndNavigate("Order successful","success", 1000,"/info/orders/",navigate)
      }

    }
  };

  return (
    <div className="profileoutline adjustgap">
      <form onSubmit={handleSubmit} className="checkoutoutline">
        <div className="addresitem">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your address"
            required
          />
        </div>
        <div className="addresitem">
          <label htmlFor="pincode">Pin Code</label>
          <input
            type="tel"
            id="pincode"
            value={pincode}
            onChange={handlePincodeChange}
            placeholder="Enter your pin code"
            required
          />
        </div>
        <div className="addresitem">
          <label htmlFor="mobile">Mobile number</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={handleMobileChange}
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <p className="codoption">Only COD available for now ................</p>
        <button type="submit" className='btn'>Buy Now</button>
        <button type="reset" className='btn cancel' onClick={()=>navigate(-1)}>Cancel</button>
      </form>
    </div>
  );
};

export default Buy;