import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FiSettings } from "react-icons/fi";
import { HiHome } from "react-icons/hi";
import { MdOutlineFeaturedVideo, MdOutlineLogout } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { UserContext } from "../../context/UserContextProvider";
import { demoAdmin } from "../../assets/images/images";
import { userLogout } from "../../services/apis/User";
import { AuthContext } from "../../context/AuthContextProvider";
import { WebsiteContext } from "../../context/WebsiteContextProvider";

const Sidebar = () => {
  const { logoutUser } = useContext(AuthContext);
  const { userDetails } = useContext(UserContext);
  const { name, photoURL, role } = userDetails;
  const { websiteInfo } = useContext(WebsiteContext);

  const location = useLocation();

  // navigation links
  const sidebarLinks = [
    { to: "/", icon: <HiHome className="text-lg" />, text: "Homepage" },
    {
      to: "/admin/feature-requests",
      icon: <MdOutlineFeaturedVideo className="text-lg" />,
      text: "Dashboard",
    },
    {
      to: "/admin/users",
      icon: <TbUsers className="text-lg" />,
      text: "Users",
    },
    {
      to: "/admin/settings",
      icon: <FiSettings className="text-lg" />,
      text: "Settings",
    },
  ];

  const navigate = useNavigate();

  // logout user using firebase
  const handleLogOut = async () => {
    try {
      // Logout user from the application context
      await userLogout();
      // Logout user from Firebase
      await logoutUser();
      navigate("/auth/login");
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Logout failed");
    }
  };

  return (
    <aside className="flex flex-col min-w-44 lg:w-64 min-h-screen px-4 py-10 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
      <Link to="/" className="mx-auto">
        <img
          className="object-cover w-10 h-10 mx-2 rounded-full"
          src={websiteInfo?.logoUrl}
          alt="logo"
        />
      </Link>
      <p className="text-center mt-3 text-gray-500 capitalize font-semibold">
        {websiteInfo?.name || ""}
      </p>
      <div className="divider"></div>
      <div className="flex flex-col items-center -mx-2">
        {photoURL ? (
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={photoURL}
            alt="avatar"
          />
        ) : (
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={demoAdmin}
            alt="demo avatar"
          />
        )}
        <h4 className="text-center mx-2 mt-2 font-medium text-gray-800 capitalize">
          {name}
        </h4>
        <p className="mx-2 mt-1 text-sm font-semibold text-sky-500 break-all uppercase">
          {role}
        </p>
      </div>

      <div className="divider"></div>

      <div className="flex flex-col justify-between flex-1">
        <nav>
          {sidebarLinks.map(({ to, icon, text }, index) => (
            <Link
              key={index}
              to={to}
              className={`flex  items-center px-4 py-2 text-gray-700 rounded-lg mb-2 ${
                location.pathname === to ? "bg-[#B4E4FF]" : "bg-gray-100"
              }`}
            >
              {icon}
              <span className="mx-2 font-medium">{text}</span>
            </Link>
          ))}
          <div className="flex gap-2  align-middle px-4 py-2 text-gray-700 rounded-lg mb-2 bg-gray-100">
            <MdOutlineLogout className="text-lg mt-1" />
            <button onClick={handleLogOut} className="font-medium">
              Sign Out
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
