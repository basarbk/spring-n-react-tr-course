import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { NavBar } from "./shared/components/NavBar";
import { Login } from "./pages/Login";
import { useState } from "react";
import { AuthenticationContext } from "./shared/state/context";

function App() {

  return (
    <AuthenticationContext>
      <NavBar/>
      <div className="container mt-3">
        {/* <Login onLoginSuccess={onLoginSuccess}/> */}
        <Outlet />
        <LanguageSelector />
      </div>
    </AuthenticationContext>
  );
}

export default App;
