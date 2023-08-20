import { createContext, useState } from "react";
import { loadAuthState, storeAuthState } from "./storage";

export const AuthContext = createContext();

export function AuthenticationContext({ children }) {
  const [auth, setAuth] = useState(loadAuthState());

  const onLoginSuccess = (data) => {
    setAuth(data);
    storeAuthState(data);
  };

  const onLogoutSuccess = () => {
    setAuth({id: 0})
    storeAuthState({id: 0})
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        onLoginSuccess,
        onLogoutSuccess
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
