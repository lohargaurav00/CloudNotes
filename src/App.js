import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteState from "./context/Notes/noteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { useState } from "react";

function App() {
  const [alert, setalert] = useState(null);

  const showAlert = (massage, type) => {
    setalert({
      massage: massage,
      type: type,
    });

    setTimeout(() => {
      setalert(null);
    }, 3000);
  };
  return (
    <NoteState>
      <Router>
        <Navbar />
        <Alert alert={alert}/>
        <div className="container">
        <Routes>
          <Route exact path="/" element={<Home  show_alert={showAlert}/>} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login show_alert={showAlert}/>} />
          <Route exact path="/signup" element={<SignUp  show_alert={showAlert}/>} />
        </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
