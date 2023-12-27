import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

const UserProfilePage = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="relative flex">
        <div className="min-h-screen lg:w-1/3"></div>
        <div className="hidden w-3/4 min-h-screen bg-gray-100 dark:bg-gray-800 lg:block"></div>

        <div className="container flex flex-col justify-center w-full min-h-screen px-2 py-10 mx-auto lg:absolute lg:inset-x-0">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            Hello <span className="text-blue-500">{user?.displayName}</span>
          </h1>

          <div className="mt-10 lg:mt-20 lg:flex lg:items-center">
            <img
              className="object-cover object-center w-full lg:w-[32rem] rounded-lg h-96"
              src={user?.photoURL}
              alt={user?.displayName}
            />

            <div className="mt-8 lg:px-10 lg:mt-0">
              <h1 className="text-2xl font-semibold text-gray-800 dark:text-white lg:w-72 mb-2">
                Profile
              </h1>

              <h3>
                Name:{" "}
                <span className="mt-6 text-lg font-medium text-blue-500">
                  {user?.displayName}
                </span>
              </h3>
              <p>
                Email:{" "}
                <span className="max-w-lg mt-6 text-gray-500 dark:text-gray-400">
                  {user?.email}
                </span>
              </p>

              <div className="grid gap-4">
                <button className="w-full sm:w-1/2 lg:w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-400 rounded-lg hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 mt-4">
                  Update Details
                </button>

                <button className="w-full sm:w-1/2 lg:w-full  px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-sky-300 rounded-lg hover:bg-sky-400 focus:outline-none focus:bg-sky-400 focus:ring focus:ring-sky-300 focus:ring-opacity-50">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfilePage;
