import React, { useEffect, useState } from 'react';
import { SalesHistory } from '../services/PurchasesService';

const Sales = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await SalesHistory();
            if (response.status === 200 && response.data.length > 0) {
                setData(response.data);
                setError("");
            } else {
                setError("No sales records found.");
                setData([]);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='tableoutline'>
            <div className="productstableheading">
                <h2 className="title">Sales</h2>
            </div>
            {error && <p className="errorMessage">{error}</p>}
            {data.length > 0 ? (
                <table className='productstable' border={1} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Product Id</th>
                            <th>Customer Id</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Address</th>
                            <th>Pin code</th>
                            <th>Ordered Date</th>
                            <th>Delivery Date</th>
                            <th>Mobile Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.productId}</td>
                                <td>{item.userId}</td>
                                <td>{item.quantity}</td>
                                <td>{item.price}</td>
                                <td>{item.address}</td>
                                <td>{item.pincode}</td>
                                <td>{item.time}</td>
                                <td>{item.deliveryDate}</td>
                                <td>{item.mobileNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : null}
        </div>
    );
};

export default Sales;
