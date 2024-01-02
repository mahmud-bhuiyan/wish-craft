import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />
      <div className="flex-1 container p-2 mx-auto mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
