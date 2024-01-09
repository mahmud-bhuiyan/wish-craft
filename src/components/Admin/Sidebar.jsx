import { useContext } from "react";
import { Link } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { UserContext } from "../../context/UserContextProvider";
import { logo, demoAdmin } from "../../assets/images/images";

const Sidebar = () => {
  const { userDetails } = useContext(UserContext);
  console.log(userDetails);
  const { _id, name, email, role, photoURL } = userDetails;
  console.log(_id, name, email, role, photoURL);

  return (
    <aside className="flex flex-col w-64 h-screen px-4 py-10 overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l">
      <a href="#" className="mx-auto">
        <img className="w-auto h-6 sm:h-7" src={logo} alt="" />
      </a>
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
          <Link
            to="/admin"
            className="flex justify-center items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
            href="#"
          >
            <MdOutlineDashboard className="text-xl" />
            <span className="mx-4 font-medium">Dashboard</span>
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
