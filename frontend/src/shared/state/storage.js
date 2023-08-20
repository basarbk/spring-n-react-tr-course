export function storeAuthState(auth){
    localStorage.setItem('auth', JSON.stringify(auth));
}

export function loadAuthState(){
    const defaultState = { id: 0 };
    const authStateInStorage = localStorage.getItem('auth');
    if(!authStateInStorage) return defaultState;
    try {
        return JSON.parse(authStateInStorage)
    } catch {
        return defaultState;
    }
}

export function storeToken(token) {
    if(token) {
        localStorage.setItem('token', JSON.stringify(token))
    } else {
        localStorage.removeItem('token');
    }
}

export function loadToken(){
    const tokenInString = localStorage.getItem('token');
    if(!tokenInString) return null;
    try {
        return JSON.parse(tokenInString);
    } catch {
        return null;
    }
}