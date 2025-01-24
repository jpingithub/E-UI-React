import axios from "axios";
import { CART, PATH, PORT_NO } from "../constants/uriconstants";

export const GetUserCart = async (user) => {
    try{
        const response = await axios.get(`${PATH}${PORT_NO}/${CART}/${user.id}`);
        return response;
    }catch(error){
        console.log(error);        
    }
}
export const DeleteProductFromCart = async (user,items,itemId) => {
    try{
        await axios.delete(`${PATH}${PORT_NO}/${CART}/${itemId}/${user.id}`);
        return items.filter(item => item.id !== itemId)
    }catch(error){
        console.log(error);        
    }
}
export const DoAddToCart = async (addToCartData) => {
    try{
       return await axios.post(`${PATH}${PORT_NO}/${CART}`,addToCartData,{
            headers:{
                "Content-Type":"application/json"
            }
        })
    }catch(error){console.log(error);
    }
}