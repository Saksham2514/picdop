import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
  let {role,auth} = useSelector(state=>state)
  const {pathname} = useLocation();
  return (
      (role !=="agent" || pathname == "/profile") && auth ? <Outlet/> : <Navigate to="/" replace/> 
  );
};

export const AdminRoute = () => {
  let {role,auth} = useSelector(state=>state)
  return (
      role ==="admin" && auth ? <Outlet/> : <Navigate to="/" replace/> 
  );
};


export default PrivateRoute;
