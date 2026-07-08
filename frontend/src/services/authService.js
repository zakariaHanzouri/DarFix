import api from "../api/axios"


export const login=(data)=>{
    return api.post('/login',data);
}

export const getCurrentUser = ()=>{
    return api.get('/user')
}