const CustomSelect = ({
  name,
  register,
  errors,
  icon: Icon,
  label,
  options,
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
      <select
        className="block w-full text-gray-700 bg-slate-100 border rounded-lg mt-1 py-2
                  px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        name={name}
        {...register(name, {
          required: `${name} is required`,
        })}
      >
        {options.map((item) => (
          <option
            className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}
      </select>
      {errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default CustomSelect;
