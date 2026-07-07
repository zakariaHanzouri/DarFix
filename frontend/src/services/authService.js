import api from "../api/axios"


export const login=(data)=>{
    return api.post('/login',data);
}