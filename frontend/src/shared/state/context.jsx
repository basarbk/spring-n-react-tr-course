import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthenticationContext({ children }) {
  const [auth, setAuth] = useState({ id: 0 });

  const onLoginSuccess = (data) => {
    setAuth(data);
  };

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        onLoginSuccess,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
