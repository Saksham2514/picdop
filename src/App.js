import "./Bidy.css";
import React    from "react";
import Login from "./pages/Login";
import Admin from "./admin/pages/Dashboard";
import SignUp from "./pages/SignUp";
import { Routes, Route } from "react-router-dom";


function App() {

  

  return (
    <div className="">
    
       <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Login/>} />
      </Routes>
       <Routes>
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </div>
  );
}

export default App;
