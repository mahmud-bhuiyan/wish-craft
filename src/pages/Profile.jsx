import { useContext } from "react";
import { IoCamera } from "react-icons/io5";
import { userPageBg } from "../assets/images/images";
import { UserContext } from "../context/UserContextProvider";
import Breadcrumbs from "../components/Breadcrumbs";

const Profile = () => {
  const { userDetails } = useContext(UserContext);
  const { name, email, photoURL, role } = userDetails;

  return (
    <div className="mx-auto h-screen max-w-7xl mt-16 px-4 py-6">
      <div className="mx-auto">
        {/* Breadcrumb Start */}
        <Breadcrumbs fromPage={"Home"} pageTitle={"Profile"} fromURL={"/"} />

        {/* Profile Section Start */}
        <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-stroke-dark dark:bg-box-dark">
          <div className="relative z-20 h-35 md:h-65">
            <img
              src={userPageBg}
              alt="profile cover"
              className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            />
          </div>
          <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
            <div className="relative z-30 mx-auto -mt-10 sm:-mt-24 h-20 lg:h-30 w-full max-w-16 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
              <div className="relative drop-shadow-2">
                <img
                  src={photoURL}
                  className="rounded-full w-full object-cover"
                  alt="users_image"
                />
                <label
                  htmlFor="photoURL"
                  className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
                >
                  <IoCamera className="text-2xl p-1" />
                  <input
                    type="file"
                    name="photoURL"
                    id="photoURL"
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="mb-2 text-2xl font-medium text-black dark:text-white capitalize">
                {name}
              </h3>
              <p className="mb-1 font-medium text-blue-600 uppercase">{role}</p>
              <p className="font-medium">{email}r</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
