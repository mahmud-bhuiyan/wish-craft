import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiHome } from "react-icons/hi";
import { UserContext } from "../../context/UserContextProvider";
import { logo, demoAdmin } from "../../assets/images/images";
import { MdOutlineFeaturedVideo, MdOutlineLogout } from "react-icons/md";
import { TbUsers } from "react-icons/tb";
import { toast } from "react-toastify";
import { userLogout } from "../../services/apis/User";
import { AuthContext } from "../../context/AuthContextProvider";

const Sidebar = () => {
  const { logoutUser } = useContext(AuthContext);
  const { userDetails } = useContext(UserContext);
  const { name, email, photoURL } = userDetails;

  const location = useLocation();

  // navigation links
  const navLinks = [
    { to: "/", icon: <HiHome className="text-xl" />, text: "Homepage" },
    {
      to: "/admin/feature-requests",
      icon: <MdOutlineFeaturedVideo className="text-xl" />,
      text: "Requests",
    },
    {
      to: "/admin/users",
      icon: <TbUsers className="text-xl" />,
      text: "Users",
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
    <aside className="flex flex-col w-64 min-h-screen px-4 py-10 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
      <Link to="/" className="mx-auto">
        <img className="w-auto h-6 sm:h-7" src={logo} alt="" />
      </Link>
      <p className="text-center mt-3 text-gray-500 capitalize font-semibold">
        WishCraft
      </p>

      <div className="flex flex-col items-center mt-6 -mx-2">
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
        <h4 className="mx-2 mt-2 font-medium text-gray-800">{name}</h4>
        <p className="mx-2 mt-1 text-sm font-medium text-gray-600">{email}</p>
      </div>

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          {navLinks.map(({ to, icon, text }, index) => (
            <Link
              key={index}
              to={to}
              className={`flex justify-center items-center px-4 py-2 text-gray-700 rounded-lg mb-2 ${
                location.pathname === to ? "bg-[#B4E4FF]" : "bg-gray-100"
              }`}
            >
              {icon}
              <span className="mx-2 font-medium">{text}</span>
            </Link>
          ))}
          <div className="flex gap-2 justify-center align-middle px-4 py-2 text-gray-700 rounded-lg mb-2 bg-gray-100">
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
