import axios from "axios";
import { i18nInstance } from "@/locales";
import { loadToken, storeToken } from "@/shared/state/storage";

const http = axios.create();

let authToken = loadToken();

export function setToken(token){
    authToken = token;
    storeToken(token);
}

http.interceptors.request.use((config) => {
    config.headers["Accept-Language"] = i18nInstance.language
    if(authToken) {
        config.headers["Authorization"] = `${authToken.prefix} ${authToken.token}`
    }
    return config;
})


export default http;