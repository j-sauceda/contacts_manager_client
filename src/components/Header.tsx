import { authStore } from "../features/auth/auth.store";
import { Link } from "react-router-dom";
import Logout from "./Logout";

function Header() {
  const isUserLoggedIn = authStore(
    (state) => state.isSuccess && !state.isError && state.accessToken
  );

  return (
    <header className="ui teal fixed inverted menu">
      {isUserLoggedIn ? (
        <div className="ui container">
          <Link to="/" className="header teal item">
            Contact Manager
          </Link>
          <Logout />
        </div>
      ) : (
        <div className="ui container">
          <Link to="/login" className="item">
            Login
          </Link>
          <Link to="/register" className="item">
            Register
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
