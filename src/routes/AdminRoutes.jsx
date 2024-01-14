import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContextProvider";

const AdminRoutes = ({ children }) => {
  const { userDetails, isLoading } = useContext(UserContext);
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }

  if (userDetails && userDetails?.email && userDetails?.role === "admin") {
    return children;
  }

  return (
    <Navigate state={{ from: location }} to="/auth/login" replace></Navigate>
  );
};

export default AdminRoutes;
