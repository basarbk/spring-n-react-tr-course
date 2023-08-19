import logo from "@/assets/hoaxify.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export function NavBar() {
  const { t } = useTranslation();
  return (
    <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} width={60} />
          Hoaxify
        </Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/signup">
              {t("signUp")}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
