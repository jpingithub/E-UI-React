import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { addProduct } from '../services/ProductService';
import { toastMessageAndNavigate } from '../services/ToastMessage';

const AddProduct = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        image: '',
        company: '',
        model: '',
        description: '',
        price: '',
        stock: '',
        category: {
            value: ''
        }
    });

    const categories = ["Mobile", "Watch", "Men", "Women", "Kitchen",
        "Fridge", "AC", "Computer", "Book", "Furniture", "Speaker", "TV"]; 

    useEffect(() => {
        if (location.state && location.state.product) {
            setFormData({
                ...location.state.product,
                category: { value: location.state.product.category.value },
            });
        }
    }, [location.state]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'category') {
            setFormData({
                ...formData,
                category: { value }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({
                    ...formData,
                    image: reader.result
                });
            };
            reader.readAsDataURL(file); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await addProduct(formData);
        if(response){
            if(response.status === 201){
                toastMessageAndNavigate("Product added succesfully", "success", 1000, "/admin/products", navigate)
            }else{
                toastMessageAndNavigate("Data updated successfully", "success", 1000, "/admin/products", navigate)  
            }
        }
    };

    return (
        <div className="addProductOutline">
            <form className="addProductFormOutline" onSubmit={handleSubmit}>
                <div className="fieldOutline">
                    <label htmlFor="image" className="label">Image</label>
                    <input type="file" name="image" className="imageInput" required={!formData.image} onChange={handleImageChange} />
                    {formData.image && <img src={formData.image} alt="Product" className='updateImagePrevious'/>}
                </div>
                <div className="fieldOutline">
                    <label htmlFor="company" className="label">Company</label>
                    <input type="text" name="company" className="input" required value={formData.company} onChange={handleChange} />
                </div>
                <div className="fieldOutline">
                    <label htmlFor="model" className="label">Model</label>
                    <input type="text" name="model" className="input" required value={formData.model} onChange={handleChange} />
                </div>
                <div className="fieldOutline">
                    <label htmlFor="description" className="label">Description</label>
                    <input type="text" name="description" className="input" required value={formData.description} onChange={handleChange} />
                </div>
                <div className="fieldOutline">
                    <label htmlFor="price" className="label">Price</label>
                    <input type="number" name="price" className="input" required min="0" step="0.01" value={formData.price} onChange={handleChange} />
                </div>
                <div className="fieldOutline">
                    <label htmlFor="stock" className="label">Stock available</label>
                    <input type="number" name="stock" className="input" required min="0" value={formData.stock} onChange={handleChange} />
                </div>
                <div className="fieldOutline">
                    <label htmlFor="category" className="label">Category</label>
                    <select name="category" className="input" required value={formData.category.value} onChange={handleChange}>
                        <option value="">Select Category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="submitBtn">{formData.id ? "Update Product" : "Add Product"}</button>
            </form>
        </div>
    );
};

export default AddProduct;
