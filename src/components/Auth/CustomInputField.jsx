const CustomInputField = ({
  type,
  name,
  placeholder,
  register,
  errors,
  icon: Icon,
}) => {
  return (
    <div className="relative mt-4">
      <span className="absolute p-3">
        {Icon && <Icon className="text-xl md:text-2xl" />}
      </span>
      <input
        className="block w-full py-3 text-gray-700 bg-slate-100 border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        type={type}
        name={name}
        placeholder={placeholder}
        {...register(name, {
          required: true,
        })}
      />
      {errors[name]?.type === "required" && (
        <span className="text-red-500 text-sm">{`${placeholder} is required`}</span>
      )}
    </div>
  );
};

export default CustomInputField;
