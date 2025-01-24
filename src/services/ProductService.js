import axios from "axios";
import { PATH, PORT_NO, PRODUCT } from "../constants/uriconstants";

export const addProduct = async (formData) => {
    try {
        if (formData.id) {
            const response = await axios.put(`${PATH}${PORT_NO}/${PRODUCT}/${formData.id}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        } else {
            const response = await axios.post(`${PATH}${PORT_NO}/${PRODUCT}`, formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response;
        }
    } catch (error) {
        console.error('Error saving product:', error);
    }
}
export const ProductsByCategory = async (category) => {
    try {
        const response = await axios.get(`${PATH}${PORT_NO}/${PRODUCT}/category/${category}`)
        return response;
    } catch (error) {
        console.log(error);
    }
}
export const DeleteProductById = async (id) => {
    try{
        return await axios.delete(`${PATH}${PORT_NO}/${PRODUCT}/${id}`);
    }catch(error){
        console.log(error);
    }
}
export const AllCategories = async () => {
    try{
        return await axios.get(`${PATH}${PORT_NO}/${PRODUCT}/categories`);
    }catch(error){
        console.log(error);        
    }
}
export const ProductById = async (id) => {
    try{
        return await axios.get(`${PATH}${PORT_NO}/${PRODUCT}/${id}`);
    }catch(error){console.log(error);
    }
}
export const Categories = async () => {
    try{
        return await axios.get(`${PATH}${PORT_NO}/${PRODUCT}/categories`)
    }catch(error){
        console.log(error);
        
    }
}