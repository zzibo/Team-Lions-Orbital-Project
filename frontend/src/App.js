import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./Pages/Home";
import Navbar from "./Components/NavBar";
import { NotesProvider } from "./Context/NotesContext";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <NotesProvider>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </NotesProvider>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
