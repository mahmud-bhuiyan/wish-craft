import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { FiUnlock, FiUser } from "react-icons/fi";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import CustomInputField from "./CustomInputField";
import CustomPasswordField from "./CustomPasswordField";
import CustomFormButton from "./CustomFormButton";

const CustomAuthForm = ({ buttonText, formReset, formSubmit, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleFormSubmit = (data) => {
    if (!isLogin && data.password !== data.confirmPassword) {
      toast.warning("Passwords do not match");
      return;
    }

    if (onSubmit) {
      onSubmit(data);
    }

    if (formReset) {
      reset();
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
        <CustomFormButton buttonText={buttonText} loading={formSubmit} />
      </div>
    </form>
  );
};

export default CustomAuthForm;
