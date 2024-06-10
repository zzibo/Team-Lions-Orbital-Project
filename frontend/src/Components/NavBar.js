import "./NavBar.css";
import echonoteslogo from "../Assets/EchonotesLogo.png";
function NavBar() {
  return (
    <div className="App-navbar">
      <img src={echonoteslogo} alt="placeholder"></img>
      <h1>Echo Notes</h1>
    </div>
  );
}

export default NavBar;
