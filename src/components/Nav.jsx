import { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { logo } from "../assets/images/images";
import { AuthContext } from "../context/AuthContextProvider";
import { UserContext } from "../context/UserContextProvider";
import { userLogout } from "../services/apis/User";
import { toast } from "react-toastify";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const Nav = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { user, logoutUser } = useContext(AuthContext);
  const { userDetails } = useContext(UserContext);

  // Extracting the first name from the user's display name
  const firstName = user
    ? user.displayName
      ? user.displayName.split(" ")[0]
      : "user"
    : "user";

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isProfileDropdownOpen]);

  return (
    <nav className="bg-[#402F3F] shadow fixed top-0 w-full z-50">
      <div className="max-w-screen-xl p-2 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img
              className="w-auto h-6 sm:h-7 bg-white rounded-full"
              src={logo}
              alt="Logo"
            />
          </Link>

          <div className="relative flex gap-4">
            {userDetails?.role === "admin" && (
              <>
                <Link
                  to="/admin/feature-requests"
                  className="btn border-2 border-gray-400 hover:border-slate-500 rounded-md text-[#A99FA8] hover:text-black bg-[#241A24]"
                >
                  Admin Panel
                </Link>
              </>
            )}

            {user ? (
              <>
                {/* Dropdown toggle button */}
                <button
                  onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="relative z-10 block p-1 sm:px-2 bg-[#241A24] border-2 hover:border-slate-500 rounded-md text-[#A99FA8] hover:text-white"
                >
                  <div className="flex items-center gap-2">
                    {/* Displaying the first name */}
                    <h3 className="text-sm">{firstName}</h3>
                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img
                        src={userDetails.photoURL}
                        className="object-cover w-full h-full"
                        alt="user photo"
                      />
                    </div>
                  </div>
                </button>
              </>
            ) : (
              <>
                {/* Redirecting to the login page for non-logged-in users */}
                <Link
                  to="/auth/login"
                  className="relative z-10 block p-1 sm:px-2  bg-[#241A24] border-2 hover:border-slate-500 rounded-md text-[#A99FA8] hover:text-white"
                >
                  <span className="flex items-center gap-1 sm:gap-2 font-semibold">
                    Login <BiLogIn className="text-xl" />
                  </span>
                </Link>
              </>
            )}

            {/* Dropdown menu */}
            <div
              ref={dropdownRef}
              style={{
                display: isProfileDropdownOpen ? "block" : "none",
              }}
              onClick={() => setProfileDropdownOpen(false)}
              className="absolute right-0 z-20 w-36 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl"
            >
              <div className="block w-full py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 text-center">
                <Link
                  to="/users/profile"
                  className="flex gap-2 justify-center align-middle"
                >
                  <FaUserCog className="text-lg pt-1" />
                  Your profile
                </Link>
              </div>
              <div className="block w-full py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 text-center">
                <div className="flex gap-2 justify-center align-middle">
                  <MdOutlineLogout className="text-lg mt-1" />
                  <button onClick={handleLogOut}>Sign Out</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
