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
