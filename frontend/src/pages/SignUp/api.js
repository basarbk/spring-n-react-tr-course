import axios from "axios";
import { i18nInstance } from "../../locales";

export function signUp(body){
    return axios.post('/api/v1/users', body, {
        headers: {
            "Accept-Language": i18nInstance.language
        }
    });
}