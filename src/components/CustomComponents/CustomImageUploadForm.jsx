import axios from "axios";
import { useForm } from "react-hook-form";

const CustomImageUploadForm = ({ onUploadSuccess, loading, setLoading }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleImgBBUpload = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", data.image[0]);
      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData,
        {
          params: {
            key: import.meta.env.VITE_IMAGE_UPLOAD_TOKEN,
          },
        }
      );
      const imageURL = response.data.data.url;
      onUploadSuccess(imageURL);
      reset();
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="m-4 border-dashed border-2 p-4 border-blue-400">
      <form onSubmit={handleSubmit(handleImgBBUpload)}>
        <div>
          <input
            className="file-input file-input-bordered w-full"
            type="file"
            accept=".jpg, .jpeg, .png"
            {...register("image", {
              required: "Image is required",
              validate: (file) =>
                /\.(jpg|jpeg|png)$/i.test(file[0]?.name) ||
                "Supported formats: jpg, jpeg, png",
            })}
          />
        </div>

        <div className="mt-3">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-[#DCFCE7] hover:bg-[#cbf2d9] rounded mr-2 font-semibold"
          >
            {loading ? "Uploading..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomImageUploadForm;
