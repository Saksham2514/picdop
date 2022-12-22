import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
  let {role,auth} = useSelector(state=>state)
  return (
      role !=="agent" && auth ? <Outlet/> : <Navigate to="/" replace/> 
  );
};
export default PrivateRoute;
