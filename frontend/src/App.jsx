import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { NavBar } from "./shared/components/NavBar";
import { Login } from "./pages/Login";
import { useState } from "react";

function App() {
  const [authState, setAuthState] = useState({
    id: 0
  })

  const onLoginSuccess = (data) => {
    setAuthState(data)
  }

  return (
    <>
      <NavBar authState={authState}/>
      <div className="container mt-3">
        <Login onLoginSuccess={onLoginSuccess}/>
        {/* <Outlet /> */}
        <LanguageSelector />
      </div>
    </>
  );
}

export default App;
