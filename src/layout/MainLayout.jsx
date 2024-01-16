import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import HeroSection from "../components/HeroSection";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import Loader from "../components/Loader";

const MainLayout = () => {
  const location = useLocation();
  const noNavigation = location.pathname.includes("profile");
  const { isLoading } = useContext(UserContext);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Nav />

      {noNavigation ? null : <HeroSection />}

      <div className="flex-1 container mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
