import { ThreeDots } from "react-loader-spinner";

const CustomButton = ({ buttonText, loading }) => {
  const buttonClass = `px-4 md:px-10 py-2 tracking-wide text-white transition-colors duration-300 transform rounded-lg bg-sky-500 hover:bg-sky-400 focus:bg-sky-400 focus:ring focus:ring-sky-300 focus:ring-opacity-50 ${
    loading ? "cursor-not-allowed" : ``
  }`;

  return (
    <button type="submit" disabled={loading} className={buttonClass}>
      {loading ? (
        <span className="flex gap-2 justify-center align-middle">
          Submitting
          <ThreeDots
            visible={true}
            height="25"
            width="25"
            color="#fff"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </span>
      ) : (
        buttonText
      )}
    </button>
  );
};

export default CustomButton;
