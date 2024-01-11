import { ThreeDots } from "react-loader-spinner";

const CustomFormButton = ({
  buttonText,
  loading,
  loadingText,
  color,
  size,
}) => {
  // Determine the background and text color based on the "color" prop
  const buttonColor =
    color === "custom"
      ? "bg-[#402F3F] text-[#F0F0F0]" // Custom color variant
      : "bg-green-100 text-gray-800"; // Default color variant

  // Determine the size styles based on the "size" prop
  const buttonSize = size === "small" ? "px-4 py-2 mt-2 rounded" : "w-full";

  // Determine the color of the loading dots based on the "color" prop
  const dotsColor = color === "custom" ? "#FFFFFF" : "#000000";

  return (
    <button
      type="submit"
      disabled={loading}
      className={`${buttonSize} font-semibold shadow-sm rounded-lg py-2 ${buttonColor} flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline`}
    >
      {loading ? (
        <span className="flex gap-2 justify-center align-middle">
          {loadingText ? loadingText : "Submitting"}{" "}
          <ThreeDots
            visible={true}
            height="25"
            width="25"
            color={dotsColor}
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </span>
      ) : (
        <>{buttonText}</>
      )}
    </button>
  );
};

export default CustomFormButton;
