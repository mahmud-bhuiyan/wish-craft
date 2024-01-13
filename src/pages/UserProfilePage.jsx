import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import UpdateUserDetailsModal from "../components/User/UpdateUserDetailsModal";
import UpdateUserPasswordModal from "../components/User/UpdateUserPasswordModal";
import { demoUser } from "../assets/images/images";
import CustomHelmet from "../components/CustomComponents/CustomHelmet";


const UserProfilePage = () => {
  const { user } = useContext(AuthContext);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isPasswordUpdateModalOpen, setIsPasswordUpdateModalOpen] =
    useState(false);

  const openUpdateModal = () => {
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
  };

  const openPasswordUpdateModal = () => {
    setIsPasswordUpdateModalOpen(true);
  };

  const closePasswordUpdateModal = () => {
    setIsPasswordUpdateModalOpen(false);
  };

  return (
    <>
      <CustomHelmet pageName={"Profile"} />
      <section className="bg-white mt-16 flex items-center justify-center">
        <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12">
          <img
            className="mx-auto w-32 max-w-40 rounded-full"
            src={user?.photoURL || demoUser}
            alt={user?.displayName}
          />

          <div className="space-y-4 text-center divide-y">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl text-blue-500">
                {user?.displayName}
              </h2>
              <p className="px-5 text-gray-500">{user?.email}</p>
            </div>
          </div>
          <div className="grid gap-4">
            <button
              onClick={openUpdateModal}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-sky-400 rounded-lg hover:bg-sky-500 focus:outline-none focus:bg-sky-500 focus:ring focus:ring-sky-500 focus:ring-opacity-50 mt-4"
            >
              Update Details
            </button>

            <button
              onClick={openPasswordUpdateModal}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-cyan-300 rounded-lg hover:bg-cyan-400 focus:outline-none focus:bg-cyan-400 focus:ring focus:ring-cyan-300 focus:ring-opacity-50"
            >
              Update Password
            </button>
          </div>
        </div>

        {/* Update User Details Modal */}
        <UpdateUserDetailsModal
          isOpen={isUpdateModalOpen}
          onClose={closeUpdateModal}
          user={user}
        />

        <UpdateUserPasswordModal
          isOpen={isPasswordUpdateModalOpen}
          onClose={closePasswordUpdateModal}
        />
      </section>
    </>
  );
};

export default UserProfilePage;
