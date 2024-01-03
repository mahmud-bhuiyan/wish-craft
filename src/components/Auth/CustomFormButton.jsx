import { ThreeDots } from "react-loader-spinner";

const CustomFormButton = ({ buttonText, loading, icon }) => {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full font-semibold shadow-sm rounded-lg py-2 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
    >
      {loading ? (
        <span className="flex gap-2 justify-center align-middle">
          Submitting
          <ThreeDots
            visible={true}
            height="25"
            width="25"
            color="#000000"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </span>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {buttonText}
        </>
      )}
    </button>
  );
};

export default CustomFormButton;
