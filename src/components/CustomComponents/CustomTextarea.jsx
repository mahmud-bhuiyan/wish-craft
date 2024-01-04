const CustomTextarea = ({
  name,
  placeholder,
  register,
  errors,
  icon: Icon,
  label,
}) => {
  return (
    <div className={`relative ${label ? "mt-3" : "mt-4"}`}>
      {label && (
        <span className="pl-1">
          <label htmlFor={name}>{label}</label>
        </span>
      )}
      {Icon && (
        <span className="absolute p-3">
          <Icon className="text-xl md:text-2xl" />
        </span>
      )}
      <textarea
        className="block h-24 w-full mt-1 py-3 text-gray-700 bg-slate-100 border rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        id={name}
        placeholder={placeholder}
        {...register(name, {
          required: true,
        })}
      />
      {errors[name] && (
        <span className="text-red-500 text-sm">{`${placeholder} is required`}</span>
      )}
    </div>
  );
};

export default CustomTextarea;
