import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Categories, ProductsByCategory } from '../services/ProductService';

const TopProducts = () => {
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});
    const [maxItems, setMaxItems] = useState(5); // Default to 5 items
    const navigate = useNavigate();

    // Function to update maxItems based on screen size
    const updateMaxItems = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth <= 768) {
            setMaxItems(4); // Show only 4 items for small screens
        } 
    };

    useEffect(() => {
        // Set maxItems on component mount
        updateMaxItems();

        // Add an event listener for window resize
        window.addEventListener('resize', updateMaxItems);

        return () => {
            // Cleanup event listener on unmount
            window.removeEventListener('resize', updateMaxItems);
        };
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await Categories();
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProductsByCategory = async () => {
            const fetchedProducts = {};
            for (const category of categories) {
                const response = await ProductsByCategory(category);
                fetchedProducts[category] = response.data.slice(0, maxItems);
            }
            setProductsByCategory(fetchedProducts);
        };

        if (categories.length > 0) {
            fetchProductsByCategory();
        }
    }, [categories, maxItems]);

    return (
        <div className="topProductsContainer">
            {categories.map((category) => (
                productsByCategory[category] && productsByCategory[category].length > 0 && (
                    <div key={category} className="categorySection">
                        <h2 className="categoryHeading">
                            {category.charAt(0).toUpperCase() + category.slice(1) + '(s)'}
                        </h2>
                        <div className="top4">
                            {productsByCategory[category].map(({ id, image, company, model, price }) => (
                                <div
                                    className="card"
                                    key={id}
                                    onClick={() => navigate(`/home/${category}/${id}`)}
                                >
                                    <img src={image} alt={`${company} ${model}`} className="productImage" />
                                    <p className="productName">{company} {model}</p>
                                    <h3 className="price">{price} /-</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            ))}
        </div>
    );
};

export default TopProducts;
