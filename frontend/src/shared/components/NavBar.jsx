import logo from "@/assets/hoaxify.png";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { AuthContext } from "../state/context";

export function NavBar() {
  const { t } = useTranslation();
  const authState = useContext(AuthContext)
  return (
    <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} width={60} />
          Hoaxify
        </Link>
        <ul className="navbar-nav">
          {authState.id === 0 && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/Login">
                  {t("login")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  {t("signUp")}
                </Link>
              </li>
            </>
          )}
          {authState.id > 0 && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={`/user/${authState.id}`}>
                  My Profile
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" role="button">Logout</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
