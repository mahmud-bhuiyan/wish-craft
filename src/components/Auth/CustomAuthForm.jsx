import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FiUnlock, FiUser } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import CustomInputField from "./CustomInputField";
import CustomPasswordField from "./CustomPasswordField";

const CustomAuthForm = ({ buttonText, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleFormSubmit = (data) => {
    if (!isLogin && data.password !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (onSubmit) {
      onSubmit(data);
    }
  };

  const isLogin = buttonText.toLowerCase() === "login";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {!isLogin && (
        <CustomInputField
          type="text"
          name="name"
          placeholder="Name"
          register={register}
          errors={errors}
          icon={FiUser}
        />
      )}

      <CustomInputField
        type="email"
        name="email"
        placeholder="Email address"
        register={register}
        errors={errors}
        icon={MdOutlineMarkEmailRead}
      />

      <CustomPasswordField
        type="password"
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        icon={FiUnlock}
      />

      {!isLogin && (
        <CustomPasswordField
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          register={register}
          errors={errors}
          icon={FiUnlock}
        />
      )}

      <div className="mt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
        >
          {buttonText}
        </button>
      </div>
    </form>
  );
};

export default CustomAuthForm;
