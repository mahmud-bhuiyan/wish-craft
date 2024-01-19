import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaUserCog } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineLogout } from "react-icons/md";
import { UserContext } from "../context/UserContextProvider";

const NavbarDropdownItem = ({ to, icon, label, onClick }) => {
  return (
    <div className="block w-full py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-100 rounded text-center cursor-pointer">
      {to ? (
        <Link to={to} className="flex gap-2 justify-center items-center">
          {icon}
          {label}
        </Link>
      ) : (
        <div
          className="flex gap-2 justify-center items-center"
          onClick={onClick}
        >
          {icon}
          {label}
        </div>
      )}
    </div>
  );
};

const NavbarDropdown = ({
  dropdownRef,
  isProfileDropdownOpen,
  setProfileDropdownOpen,
  handleLogOut,
}) => {
  const { userDetails } = useContext(UserContext);
  return (
    <div
      ref={dropdownRef}
      style={{
        display: isProfileDropdownOpen ? "block" : "none",
      }}
      onClick={() => setProfileDropdownOpen(false)}
      className="absolute right-0 mt-11 w-40 mb-2 origin-top-right bg-white rounded shadow-xl"
    >
      <NavbarDropdownItem
        to="/users/profile"
        icon={<FaUserCog className="text-lg" />}
        label="Your profile"
      />
      <hr className="border-gray-200 dark:border-gray-700 " />
      <NavbarDropdownItem
        to="/profile"
        icon={<FaRegUser className="text-lg" />}
        label="My Profile"
      />
      <hr className="border-gray-200 dark:border-gray-700 " />
      {userDetails?.role === "admin" && (
        <>
          <NavbarDropdownItem
            to="/dashboard"
            icon={<MdAdminPanelSettings className="text-xl" />}
            label="Settings"
          />
          <hr className="border-gray-200 dark:border-gray-700 " />
        </>
      )}
      <NavbarDropdownItem
        onClick={handleLogOut}
        icon={<MdOutlineLogout className="text-lg" />}
        label="Sign Out"
      />
    </div>
  );
};

export default NavbarDropdown;
