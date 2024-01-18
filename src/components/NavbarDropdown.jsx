import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaRegUser, FaUserCog } from "react-icons/fa";
import { MdAdminPanelSettings, MdOutlineLogout } from "react-icons/md";
import { UserContext } from "../context/UserContextProvider";

const NavbarDropdownItem = ({ to, icon, label, onClick }) => {
  return (
    <div className="block w-full py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform hover:bg-gray-200 text-center cursor-pointer">
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
      className="absolute right-0 z-20 w-40 mb-2 py-2 origin-top-right bg-white rounded-md shadow-xl"
    >
      <NavbarDropdownItem
        to="/users/profile"
        icon={<FaUserCog className="text-xl pt-1" />}
        label="Your profile"
      />
      <NavbarDropdownItem
        to="/profile"
        icon={<FaRegUser className="text-xl pt-1" />}
        label="My Profile"
      />
      {userDetails?.role === "admin" && (
        <NavbarDropdownItem
          to="/admin/feature-requests"
          icon={<MdAdminPanelSettings className="text-2xl pt-1" />}
          label="Settings"
        />
      )}
      <NavbarDropdownItem
        onClick={handleLogOut}
        icon={<MdOutlineLogout className="text-xl mt-1" />}
        label="Sign Out"
      />
    </div>
  );
};

export default NavbarDropdown;
