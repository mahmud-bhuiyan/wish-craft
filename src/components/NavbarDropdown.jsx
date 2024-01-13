import { Link } from "react-router-dom";
import { FaUserCog } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const NavbarDropdown = ({
  dropdownRef,
  isProfileDropdownOpen,
  setProfileDropdownOpen,
  handleLogOut,
}) => {
  return (
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
  );
};

export default NavbarDropdown;
