import { useState } from "react";
import { logo } from "../assets/images/images";

const Navbar = () => {
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  return (
    <nav className="relative bg-[#DFF4F3] shadow">
      <div className="container p-2 mx-auto">
        <div className="flex items-center justify-between">
          <a href="#">
            <img className="w-auto h-6 sm:h-7" src={logo} alt="Logo" />
          </a>

          <div className="relative inline-block">
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

            {/* Dropdown menu */}
            <div
              style={{
                display: isProfileDropdownOpen ? "block" : "none",
              }}
              onClick={() => setProfileDropdownOpen(false)}
              className="absolute right-0 z-20 w-48 py-2 mt-2 origin-top-right bg-white rounded-md shadow-xl"
            >
              <a
                href="#"
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Your profile
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
