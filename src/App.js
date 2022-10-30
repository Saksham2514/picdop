import "./Bidy.css";
import React    from "react";
import Login from "./pages/Login";
import Delivery from "./admin/components/Delivery";
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
        <Route path="/delivery" element={<Delivery/>} />
        <Route path="/collection" element={<Admin/>} />
        <Route path="/earnings" element={<Admin/>} />
        <Route path="/prices" element={<Admin/>} />
        
        
      </Routes>
    </div>
  );
}

export default App;
