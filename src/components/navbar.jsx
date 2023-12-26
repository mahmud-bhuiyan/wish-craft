import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { logo } from "../assets/images/images";
import { AuthContext } from "../context/AuthContextProvider";

const Navbar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const { user, logoutUser } = useContext(AuthContext);

  // logout user using firebase
  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        console.log("Sign-out successful");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="relative bg-[#EEF5FF] shadow">
      <div className="container p-2 mx-auto">
        <div className="flex items-center justify-between">
          <Link to="/">
            <img className="w-auto h-6 sm:h-7" src={logo} alt="Logo" />
          </Link>

          <div className="relative inline-block">
            {user ? (
              <>
                {/* Dropdown toggle button */}
                <button
                  onClick={() => setProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="relative z-10 block px-1 text-gray-700 bg-white border border-transparent rounded-md  focus:border-blue-500 focus:ring-opacity-40 focus:ring-blue-300 focus:ring focus:outline-none"
                >
                  <div className="flex items-center gap-2">
                    <h3 className="text-gray-700 text-sm">Mahmud</h3>
                    <div className="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full">
                      <img
                        src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                        className="object-cover w-full h-full"
                        alt="Avatar"
                      />
                    </div>
                  </div>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/auth/login"
                  className="relative z-10 block p-1 sm:px-2  bg-[#86B6F6] border-2 hover:border-slate-500 rounded-md hover:text-white text-slate-600"
                >
                  <span className="flex items-center gap-1 sm:gap-2 font-semibold">
                    Login <BiLogIn className="text-xl" />
                  </span>
                </Link>
              </>
            )}

            {/* Dropdown menu */}
            <div
              style={{
                display: isProfileDropdownOpen ? "block" : "none",
              }}
              onClick={() => setProfileDropdownOpen(false)}
              className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl"
            >
              <Link
                to="/"
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Your profile
              </Link>
              <div className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100">
                <button onClick={handleLogOut}>Sign Out</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
