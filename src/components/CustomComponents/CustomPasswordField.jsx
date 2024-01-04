import { useState } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

const CustomPasswordField = ({
  name,
  placeholder,
  register,
  errors,
  icon: Icon,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative mt-4">
      <span className="absolute p-3">
        {Icon && <Icon className="text-xl md:text-2xl" />}
      </span>

      <input
        className="block w-full py-3 text-gray-700 bg-slate-100 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type={showPassword ? "text" : "password"}
        name={name}
        placeholder={placeholder}
        {...register(name, {
          required: true,
          minLength: 6,
          maxLength: 20,
        })}
      />

      <span className="absolute top-0 right-0 p-3">
        {showPassword ? (
          <HiEyeOff
            className="text-xl md:text-2xl cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <HiEye
            className="text-xl md:text-2xl cursor-pointer"
            onClick={togglePasswordVisibility}
          />
        )}
      </span>

      {errors[name]?.type === "required" && (
        <span className="text-red-500 text-sm">{`${placeholder} is required`}</span>
      )}
      {errors[name]?.type === "minLength" && (
        <span className="text-red-500 text-sm">
          Password must be at least 6 characters
        </span>
      )}
      {errors[name]?.type === "maxLength" && (
        <span className="text-red-500 text-sm">
          Password must be at most 20 characters
        </span>
      )}
    </div>
  );
};

export default CustomPasswordField;
