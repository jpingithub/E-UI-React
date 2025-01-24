import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProductsByCategory } from '../services/ProductService';

const AllDynamicItems = () => {
    let { category } = useParams();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await ProductsByCategory(category);
            if(response.status === 200){
                setData(response.data);
                setError(null)
            }else {
                setError("No products found in this category.");
                setData([]); 
            } 
        };

        fetchData();
    }, [category]);

    return (
        <div className='allitems'>
            {error ? (
                <p>{error}</p>
            ) : (
                data.length > 0 ? (
                    data.map((item) => (
                        <div key={item.id} className='card'>
                            <Link className="LinkItem" to={`/home/${item.category}/${item.id}`} style={{ textDecoration: 'none' }}>
                                <img src={item.image} alt={item.model} />
                            </Link>
                            <p className='productName'>{item.company} {item.model}</p>
                            <h3 className='price'>{item.price} /-</h3>
                        </div>
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )
            )}
        </div>
    );
};

export default AllDynamicItems;
