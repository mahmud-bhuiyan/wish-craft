import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";
import CustomModalInputField from "./CustomModalInputField";
import { AuthContext } from "../../context/AuthContextProvider";
import { toast } from "react-toastify";

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
    const { displayName, email, photo } = data;

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
        await updateUserProfile(displayName, data?.photo);
      }

      if (email) {
        await updateUserEmail(email);
      }

      onClose();
      setUpdateClicked(false);
      toast.success("User updated successful.");
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("An error occurred");
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
          <CustomModalInputField
            label="Name"
            name="displayName"
            type="text"
            register={register}
            errors={errors}
          />

          {/* TODO: photo update */}
          {/* <CustomModalInputField
            label="Photo URL"
            name="photoURL"
            type="text"
            register={register}
            errors={errors}
          /> */}

          <CustomModalInputField
            label="Email"
            name="email"
            type="email"
            register={register}
            errors={errors}
          />
          <div className="flex justify-end flex-wrap">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-red-500 text-white px-4 md:px-10 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <CustomButton
              buttonText="Submit"
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
