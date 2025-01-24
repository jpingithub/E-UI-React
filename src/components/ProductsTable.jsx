import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PATH, PORT_NO, PRODUCT } from '../constants/uriconstants';
import { DeleteProductById } from '../services/ProductService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const Table = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${PATH}${PORT_NO}/${PRODUCT}`)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    const navigateToAddProduct = () => {
        navigate("/admin/add-product");
    }

    const handleDelete = async (id) => {
        const response = await DeleteProductById(id);
        if (response.status === 200) {
            toastMessageAndNavigate("Product deleted successfully","success", 1000,"/admin/products", navigate);
            setData(data.filter(item => item.id !== id));
        } else {
            console.error("Failed to delete the product.");
        } console.error("There was an error deleting the product!", error);
    }
    const handleEdit = (item) => {
        navigate(`/admin/add-product`, { state: { product: item } });
    }


    return (
        <div className='tableoutline'>
            <div className="productstableheading">
                <h2 className="title">Products</h2>
                <button onClick={navigateToAddProduct}>Add Product + </button>
            </div>
            <table className='productstable' border={1} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Image</th>
                        <th>Company</th>
                        <th>Model</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td className='imageGrid'><img src={item.image} alt={item.model} /></td>
                                <td>{item.company}</td>
                                <td>{item.model}</td>
                                <td className='descriptiongrid'>{item.description}</td>
                                <td>{item.price}</td>
                                <td><button className='editBtn' onClick={() => handleEdit(item)}>Edit</button></td>
                                <td><button className='deleteBtn' onClick={() => handleDelete(item.id)}>Delete</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
