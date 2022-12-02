import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const PrivateRoute = () => {
  let authe = useSelector(state=>state.auth)
  return (
      authe ? <Outlet/> : <Navigate to="/" replace/> 
  );
};
export default PrivateRoute;
