import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { NavBar } from "./shared/components/NavBar";
import { AuthenticationContext } from "./shared/state/context";

function App() {

  return (
    <AuthenticationContext>
      <NavBar/>
      <div className="container mt-3">
        <Outlet />
        <LanguageSelector />
      </div>
    </AuthenticationContext>
  );
}

export default App;
