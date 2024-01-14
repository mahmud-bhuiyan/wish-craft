import { useContext, useRef, useState } from "react";
import { toast } from "react-toastify";
import { updateWebsiteImage } from "../services/apis/Website";
import { WebsiteContext } from "../context/WebsiteContextProvider";

const ImageUpload = () => {
  const { setRefetch } = useContext(WebsiteContext);
  const [uploadError, setUploadError] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    try {
      if (!fileInputRef.current || !fileInputRef.current.files[0]) {
        setUploadError("Please select a file");
        return;
      }

      const allowedExtensions = ["jpg", "jpeg", "png"];
      const selectedFile = fileInputRef.current.files[0];
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      if (!allowedExtensions.includes(fileExtension)) {
        setUploadError("Only jpg, jpeg, and png files are allowed");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);

      const result = await updateWebsiteImage(formData);

      if (result) {
        toast.success(result.message);
        setRefetch((prevRefetch) => !prevRefetch);
        fileInputRef.current.value = "";
        setUploadError(null);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setUploadError("Error uploading image. Please try again.");
    }
  };

  return (
    <div className="mt-4 shadow-lg p-4 rounded-lg">
      <input
        type="file"
        name="file"
        onChange={() => setUploadError(null)} // Clear error when a new file is selected
        ref={fileInputRef}
      />
      <button onClick={handleUpload} className="p-2 bg-[#DCFCE7] rounded-lg">
        Upload Image
      </button>
      {uploadError && <p style={{ color: "red" }}>{uploadError}</p>}
    </div>
  );
};

export default ImageUpload;
