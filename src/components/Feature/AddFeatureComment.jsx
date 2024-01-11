import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { addFeatureComment } from "../../services/apis/Feature";
import CustomTextarea from "../CustomComponents/CustomTextarea";
import CustomFormButton from "../CustomComponents/CustomFormButton";

const AddFeatureComment = ({ id, setRefresh }) => {
  // State to track form submission status
  const [formSubmit, setFormSubmit] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    const comment = {
      comment: data.comment,
    };

    try {
      setFormSubmit(true);

      // Make API call to add a feature comment
      const response = await addFeatureComment(id, comment);

      // Display success toast
      toast.success(response.message);
      console.log(response);

      // Trigger a refetch to update the feature with the new comment
      setRefresh((prevRefetch) => !prevRefetch);

      // Reset the form after successful submission
      reset();
    } catch (error) {
      // Handle and log errors during comment submission
      console.error("Error adding comment:", error);
    } finally {
      setFormSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* CustomTextarea component */}
      <CustomTextarea
        name="comment"
        placeholder="Write your comment here..."
        register={register}
        errors={errors}
      />

      <div className="mt-4">
        {/* CustomFormButton component */}
        <CustomFormButton
          buttonText={"Add Comment"}
          loading={formSubmit}
          color={"custom"}
          size={"small"}
        />
      </div>
    </form>
  );
};

export default AddFeatureComment;
