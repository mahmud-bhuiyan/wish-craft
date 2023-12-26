import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return <Loader />;
  }

  if (user?.email) {
    return children;
  }

  return (
    <Navigate state={{ from: location }} to="/auth/login" replace></Navigate>
  );
};

export default PrivateRoute;
