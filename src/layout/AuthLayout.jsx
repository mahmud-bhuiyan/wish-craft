import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-900">
      <div className="flex-1 container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
