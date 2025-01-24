import { PATH, PORT_NO, USER } from "../constants/uriconstants";
import axios from 'axios'
export const registerUser = async (formData) => {
    try {
        const response = await axios.post(`${PATH}${PORT_NO}/${USER}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response);
        return response;
    } catch (error) {
        if(error.response){
            return error.response
        }
    }
}
export const PasswordResetAPI = async (data) => {
    try{
        return await axios.patch(`${PATH}${PORT_NO}/${USER}/password-reset`,data,{
            headers:{
                "Content-Type":"Application/json"
            }
        });
    }catch(error){
        console.log(error);
    }
}
export const UpdateUserProfile = async (user,updatedUser) => {
    try{
        return await axios.put(`${PATH}${PORT_NO}/${USER}/${user.id}`, updatedUser, {
            headers: {
              "Content-Type": "application/json",
            },
          });
    }catch(error){
        console.log(error);
        
    }
}
export const AllUsers = async () => {
    try{
        return  await axios.get(`${PATH}${PORT_NO}/${USER}`);
    }catch(error){
        console.log(error);
        
    }
}
export const LoginUriCall = async (loginRequest) => {
    try{
        return await axios.post(`${PATH}${PORT_NO}/${USER}/login`, loginRequest,{
            headers:{
              "Content-Type":"application/json"
            }
          });
    }catch(error){
        console.log(error);        
    }
}