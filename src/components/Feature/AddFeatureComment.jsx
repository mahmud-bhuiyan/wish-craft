import { useForm } from "react-hook-form";
import CustomTextarea from "../CustomComponents/CustomTextarea";
import CustomFormButton from "../CustomComponents/CustomFormButton";
import { useState } from "react";
import { addFeatureComment } from "../../services/apis/Feature";

const AddFeatureComment = ({ id, setRefresh }) => {
  const [formSubmit, setFormSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setFormSubmit(true);

    try {
      // Make API call to add a feature comment
      await addFeatureComment(id, data.comment);

      // Trigger a refetch
      setRefresh((prevRefetch) => !prevRefetch);

      // Reset the form
      reset();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setFormSubmit(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CustomTextarea
        name="comment"
        placeholder="Write your comment here..."
        register={register}
        errors={errors}
      />

      <div className="mt-4">
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
