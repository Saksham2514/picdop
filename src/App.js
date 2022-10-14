import "./App.css";
import React    from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";


function App() {

  

  return (
    <div className="App">
       <Routes>
        <Route path="/register" element={<Login />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
