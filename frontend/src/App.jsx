import { Outlet } from "react-router-dom";
import { LanguageSelector } from "./shared/components/LanguageSelector";
import { NavBar } from "./shared/components/NavBar";
import { AuthenticationContext } from "./shared/state/context";
import { Provider } from "react-redux";
import { store } from "./shared/state/redux";

function App() {

  return (
    // <AuthenticationContext>
      <Provider store={store}>
        <NavBar/>
        <div className="container mt-3">
          <Outlet />
          <LanguageSelector />
        </div>
      </Provider>
    // </AuthenticationContext>
  );
}

export default App;
