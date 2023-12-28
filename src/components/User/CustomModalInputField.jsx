const CustomModalInputField = ({ label, name, type, register, errors }) => {
  // regular expression for email validation
  const emailValidationPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-600">
        {label}
      </label>
      <input
        {...register(name, {
          required: `${label} is required`,
          pattern: {
            value: type === "email" ? emailValidationPattern : null,
            message: "Invalid email address",
          },
        })}
        type={type}
        className="mt-1 p-2 border rounded-md w-full"
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomModalInputField;
