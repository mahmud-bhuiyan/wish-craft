import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";

const MainLayout = () => {
  const location = useLocation();
  const noNavigation = location.pathname.includes("profile");
  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {noNavigation ? null : <HeroSection />}

      <div className="flex-1 container p-2 mx-auto mt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
