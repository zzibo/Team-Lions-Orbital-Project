import "./NavBar.css";
import { Link } from "react-router-dom";
import echonoteslogo from "../Assets/EchonotesLogo.png";
import { useLogout } from "../Hooks/useLogout";
import { useAuthContext } from "../Hooks/useAuthContext";

function NavBar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo-container">
        <img src={echonoteslogo} alt="Echo Notes Logo" />
        <Link to="/" className="title">
          <h2>Echo Notes</h2>
        </Link>
      </div>

      {user && (
        <div className="logout-container">
          <span className="userID">{user.email}</span>
          <ul className="navbar-links">
            <li>
              <Link to="/aboutUs">About</Link>
            </li>
          </ul>
          <button onClick={handleClick}>Log out</button>
        </div>
      )}

      {!user && (
        <ul className="navbar-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/aboutUs">About</Link>
          </li>
        </ul>
      )}
    </nav>
  );
  /*
  return (
    <div className="App-navbar">
      <img src={echonoteslogo} alt="placeholder"></img>
      <h1>Echo Notes</h1>
      <p id="hi"></p>
      <button type="button" onClick={aboutUs}>About us</button>
    </div>
  ); */
}

export default NavBar;
