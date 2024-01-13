import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FiUnlock, FiUser } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import CustomInputField from "../CustomComponents/CustomInputField";
import CustomPasswordField from "../CustomComponents/CustomPasswordField";
import CustomFormButton from "../CustomComponents/CustomFormButton";

const CustomAuthForm = ({ buttonText, formReset, formSubmit, onSubmit }) => {
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handling form submission
  const handleFormSubmit = (data) => {
    // Check if it's a registration form and passwords match
    if (!isLogin && data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    // Call the onSubmit callback function if provided
    if (onSubmit) {
      onSubmit(data);
    }

    // Reset the form if needed
    if (formReset) {
      reset();
    }
  };

  // Determine if it's a login form
  const isLogin = buttonText.toLowerCase() === "login";

  // Set loadingText based on login or registration
  const loadingText = isLogin ? "Logging In" : "Registering";

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Display name input field for registration */}
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

      {/* Email input field */}
      <CustomInputField
        type="email"
        name="email"
        placeholder="Email address"
        register={register}
        errors={errors}
        icon={MdOutlineMarkEmailRead}
      />

      {/* Password input field */}
      <CustomPasswordField
        type="password"
        name="password"
        placeholder="Password"
        register={register}
        errors={errors}
        icon={FiUnlock}
      />

      {/* Confirm password input field for registration */}
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

      {/* Form submission button */}
      <CustomFormButton
        buttonText={buttonText}
        loading={formSubmit}
        loadingText={loadingText}
      />
    </form>
  );
};

export default CustomAuthForm;
