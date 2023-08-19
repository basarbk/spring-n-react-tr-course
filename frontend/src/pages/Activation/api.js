import axios from "axios";

export function activateUser(token){
    return axios.patch(`/api/v1/users/${token}/active`)
}