import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div className="container h-screen mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
