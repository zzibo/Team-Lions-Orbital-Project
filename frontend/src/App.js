import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./Hooks/useAuthContext";

// pages & components
import Home from "./Pages/Home";
import Navbar from "./Components/NavBar";
import AboutUs from "./Pages/AboutUs";
import { NotesProvider } from "./Context/NotesContext";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LandingPage from "./pages/LandingPage";
import NotePage from "./pages/NotePage";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <NotesProvider>
            <Routes>
              <Route path="/" element={user ? <Home /> : <LandingPage />} />
              <Route
                path="/home"
                element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route path="/aboutUs" element={<AboutUs />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/" />}
              />
              <Route
                path="/signup"
                element={!user ? <Signup /> : <Navigate to="/" />}
              />
              <Route path="/:noteId" element={<NotePage />} />
            </Routes>
          </NotesProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
