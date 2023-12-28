import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../CustomButton";

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
          <h3 className="text-lg font-medium mb-4">Update User Details</h3>

          <div className="mb-4">
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              {...register("displayName")}
              type="text"
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.displayName && (
              <span className="text-red-500 text-sm">
                {errors.displayName.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              type="email"
              className="mt-1 p-2 border rounded-md w-full"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

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
