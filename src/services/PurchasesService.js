import axios from "axios";
import { PATH, PORT_NO, PURCHASE } from "../constants/uriconstants";

export const Purchase = async (payload) =>{
    const response = await axios.post(`${PATH}${PORT_NO}/${PURCHASE}`, payload, {
        headers: {"Content-Type": "application/json"}
      });
      return response;
}
export const AllPurchases =  async (user) => {
  try{
    return await axios.get(`${PATH}${PORT_NO}/${PURCHASE}/${user.id}`);
  }catch(error){
    console.log(error);
  }
}
export const SalesHistory = async () => {
  try{
   return await axios.get(`${PATH}${PORT_NO}/${PURCHASE}`);
  }catch(error){
    console.log(error);
  }
}