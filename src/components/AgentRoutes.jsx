import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const AgentRoute = () => {
  let {role} = useSelector(state=>state)
  return (
      role ==="agent" ? <Outlet/> : <Navigate to="/" replace/> 
  );
};
export default AgentRoute;
