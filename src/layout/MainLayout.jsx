import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container h-screen p-2 mx-auto mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
