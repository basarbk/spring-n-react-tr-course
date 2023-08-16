import axios from "axios";

export function signUp(body){
    return axios.post('/api/v1/users', body);
}