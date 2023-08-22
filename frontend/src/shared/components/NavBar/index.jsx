import logo from "@/assets/hoaxify.png";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "../../state/context";
import { ProfileImage } from "../ProfileImage";
import { logout } from "./api";

export function NavBar() {
  const { t } = useTranslation();
  const authState = useAuthState();
  const dispatch = useAuthDispatch();

  const onClickLogout = async () => {
    try {
      await logout();
    } catch {

    } finally {
      dispatch({type: 'logout-success'});
    }
  }
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
                  <ProfileImage width={30} image={authState.image}/>
                  <span className="ms-1">{authState.username}</span>
                </Link>
              </li>
              <li className="nav-item">
                <span className="nav-link" role="button" onClick={onClickLogout}>Logout</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
