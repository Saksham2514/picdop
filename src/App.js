import "./Bidy.css";
import React    from "react";
import Login from "./pages/Login";

import Delivery from "./admin/components/Delivery";
import Collection from "./admin/components/Collection";
import Prices from "./admin/components/Prices";
import {UserClass} from "./admin/pages/UserClass";
import Orders from "./admin/components/Orders";
import Profile from "./admin/components/Profile";
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
        <Route path="/collection" element={<Collection/>} />
        <Route path="/earnings" element={<Admin/>} />
        <Route path="/orders" element={<Orders/>} />
        <Route path="/prices" element={<Prices/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/users" element={<UserClass/>} />
      </Routes>
    
    </div>
  );
}

export default App;
