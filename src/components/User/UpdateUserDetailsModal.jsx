import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiUser } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import CustomInputField from "../CustomComponents/CustomInputField";
import CustomButton from "../CustomComponents/CustomButton";
import { AuthContext } from "../../context/AuthContextProvider";
import { updateUser } from "../../services/apis/User";

const UpdateUserDetailsModal = ({ isOpen, onClose, user }) => {
  const { updateUserProfile } = useContext(AuthContext);
  const [updateClicked, setUpdateClicked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Set initial values when the modal is opened
  useEffect(() => {
    if (user) {
      setValue("displayName", user.displayName || "");
      setValue("email", user.email || "");
    }
  }, [user, setValue]);

  const updateUserDetails = async (data) => {
    const userDetails = {
      name: data.displayName,
      email: data.email,
    };

    // Check if both displayName
    if (user.displayName === userDetails.name) {
      // If unchanged, display toast message and return
      toast.info("Nothing to update.");
      return;
    }

    try {
      setUpdateClicked(true);

      if (userDetails.name) {
        //update in firebase
        await updateUserProfile(userDetails.name);

        // update in mongodb
        const response = await updateUser(userDetails);
        if (response.user.email) {
          onClose();
          toast.success(response.message);
        }
      }
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred");
    } finally {
      setUpdateClicked(false);
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-10 overflow-y-auto p-2 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <form
        onSubmit={handleSubmit(updateUserDetails)}
        className="flex items-center justify-center min-h-screen max-w-96 mx-auto"
      >
        <div className="bg-white w-full p-8 rounded-md drop-shadow-2xl">
          <h3 className="text-xl font-bold mb-4 text-center underline">
            Update User Details
          </h3>

          <div className="relative mt-4">
            <span className="absolute p-3">
              <MdOutlineMarkEmailRead className="text-2xl" />
            </span>
            <input
              className="block w-full py-3 bg-sky-100  rounded-lg px-11"
              {...register("email")}
              disabled
              value={user.email}
            />
          </div>

          <CustomInputField
            type="text"
            name="displayName"
            placeholder="Enter your Name"
            register={register}
            errors={errors}
            icon={FiUser}
          />

          <div className="flex justify-center flex-wrap mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 md:px-10 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <CustomButton buttonText="Update" loading={updateClicked} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetailsModal;
