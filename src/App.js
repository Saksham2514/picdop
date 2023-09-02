import "./assets/css/Bidy.module.css";
import React from "react";
import Login from "./pages/Login";

import Delivery from "./admin/components/Delivery";
import Collection from "./admin/components/Collection";
import Prices from "./admin/components/Prices";
import { UserClass } from "./admin/pages/UserClass";
import Orders from "./admin/components/Orders";
import Profile from "./admin/components/Profile";
import Admin from "./admin/pages/Dashboard";

import PrivateRoutes, { AdminRoute } from "./components/PrivateRoutes";
import AgentRoutes from "./components/AgentRoutes";
import SignUp from "./pages/SignUp";
import { Routes, Route, Navigate } from "react-router-dom";
import { AgentHome } from "./agents/AgentHome";
import { AgentOrders } from "./agents/AgentOrders";
import { CompletedOrders } from "./agents/CompletedOrders";
import { useDispatch } from "react-redux";
import { logout } from "./redux/slice";
import NotesAdmin from "./admin/pages/NotesAdmin";
import Notes from "./admin/pages/Notes";
import CommissionReq from "./admin/pages/CommissionReq";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
      {/* Private Routes */}
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/orders/:orderId" element={<Orders />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:userId" element={<UserClass />} />
          <Route path="/notes" element={<Notes />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/prices" element={<Prices />} />
          <Route path="/commission-request" element={<CommissionReq />} />
          <Route path="/notesAdmin" element={<NotesAdmin />} />
        </Route>
      </Routes>
      <Routes>
        <Route element={<AgentRoutes />}>
          <Route path="/agent" element={<AgentHome />} />
          <Route path="/orders" element={<AgentOrders />} />
          <Route path="/agent/complete" element={<CompletedOrders />} />
          {/* <Route path="/agent" element={<Admin />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:userId" element={<UserClass  />} /> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;

const Logout = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Navigate to="/" replace />
      {dispatch(logout())}
    </>
  );
};
