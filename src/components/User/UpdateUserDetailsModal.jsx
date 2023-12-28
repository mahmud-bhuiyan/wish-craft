import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiUser } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import CustomInputField from "../Auth/CustomInputField";
import CustomButton from "../CustomButton";
import { AuthContext } from "../../context/AuthContextProvider";

const UpdateUserDetailsModal = ({ isOpen, onClose, user }) => {
  const { updateUserEmail, updateUserProfile } = useContext(AuthContext);
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
    const { displayName, email } = data;

    // Check if both displayName and email are unchanged
    if (user.displayName === displayName && user.email === email) {
      // If unchanged, display toast message and return
      toast.info("Nothing to update.");
      onClose();
      return;
    }

    try {
      setUpdateClicked(true);

      if (displayName) {
        await updateUserProfile(displayName);
      }

      if (email) {
        await updateUserEmail(email);
      }

      onClose();
      toast.success("User updated successful.");
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
      className={`fixed inset-0 z-10 overflow-y-auto ${
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

          <CustomInputField
            type="text"
            name="displayName"
            placeholder="Enter your Name"
            register={register}
            errors={errors}
            icon={FiUser}
          />

          <CustomInputField
            type="email"
            name="email"
            placeholder="Enter your Name"
            register={register}
            errors={errors}
            icon={MdOutlineMarkEmailRead}
          />

          <div className="flex justify-end flex-wrap mt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 md:px-10 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <CustomButton
              buttonText="Update"
              loading={updateClicked}
              color="blue"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetailsModal;
