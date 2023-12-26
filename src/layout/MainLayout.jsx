import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container p-2 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
