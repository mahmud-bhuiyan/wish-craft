import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";
import CustomModalInputField from "./CustomModalInputField";

const UpdateUserDetailsModal = ({ isOpen, onClose, user }) => {
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
    console.log(data);
    onClose();
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
            <CustomButton buttonText="Submit" loading={false} color="blue" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetailsModal;
