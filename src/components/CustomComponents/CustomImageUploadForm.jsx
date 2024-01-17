import axios from "axios";
import { useForm } from "react-hook-form";

const CustomImageUploadForm = ({ onUploadSuccess, loading, setLoading }) => {
  const { register, handleSubmit, reset } = useForm();

  // Function to handle image upload to ImgBB
  const handleImgBBUpload = async (data) => {
    try {
      setLoading(true);

      // Create FormData and append the selected image to it
      const formData = new FormData();
      formData.append("image", data.image[0]);

      // Make a POST request to ImgBB API for image upload
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
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(handleImgBBUpload)}>
        <div>
          <input
            className="file-input file-input-bordered w-full"
            type="file"
            accept=".jpg, .jpeg, .png"
            {...register("image", {
              required: "Image is required",
              validate: (file) =>
                // Validate the file format
                /\.(jpg|jpeg|png)$/i.test(file[0]?.name) ||
                "Supported formats: jpg, jpeg, png",
            })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-slate-300 hover:bg-slate-400 mt-3 rounded"
        >
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CustomImageUploadForm;
