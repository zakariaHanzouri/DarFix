import api from "../api/axios"


export const getServices=()=>{
    return api.get('/services');
}