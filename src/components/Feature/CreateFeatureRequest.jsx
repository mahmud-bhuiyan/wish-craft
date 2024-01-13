import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import CustomInputField from "../CustomComponents/CustomInputField";
import CustomTextarea from "../CustomComponents/CustomTextarea";
import CustomFormButton from "../CustomComponents/CustomFormButton";
import { createRequest } from "../../services/apis/Feature";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import CustomHelmet from "../CustomComponents/CustomHelmet";

const CreateFeatureRequest = () => {
  // State to track the form submission status
  const [formSubmit, setFormSubmit] = useState(false);

  // Destructuring context values
  const { setFeatures, setRefetch } = useContext(FeaturesContext);

  // React Router hook for navigation
  const navigate = useNavigate();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to handle form submission
  const onSubmit = async (data) => {
    // Extracting relevant data from the form
    const featureData = {
      title: data.title,
      description: data.description,
    };

    try {
      setFormSubmit(true);

      // API call to create a feature request
      const response = await createRequest(featureData);

      // Check if the feature request was successfully created
      if (response.feature._id) {
        toast.success(response.message);

        // Update features list in context
        setFeatures((prevFeatures) => [response.feature, ...prevFeatures]);

        // Trigger a refetch of the features
        setRefetch((prevRefetch) => !prevRefetch);

        // Redirect to the home page and reset the form
        navigate("/");
        reset();
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error);
    } finally {
      setFormSubmit(false);
    }
  };

  return (
    <div className="mx-2 my-8">
      <div className="container mx-auto max-w-3xl bg-white shadow-lg rounded-lg p-4">
        <CustomHelmet pageName={"Create Request"} />

        <div className="p-4 border-2 rounded-lg">
          <div className="sm:flex justify-between pb-2 sm:pb-0">
            {/* Heading and "See All Posts" link */}
            <h2 className="font-semibold text-2xl mb-2 ml-1">
              Create Feature Request
            </h2>

            <Link
              to="/"
              onClick={() => setRefetch((prevRefresh) => !prevRefresh)}
              className="bg-[#F0F0F0] rounded p-2 flex gap-2 justify-center items-center"
            >
              <IoReturnUpBackSharp className="text-2xl" />
              SEE ALL POSTS
            </Link>
          </div>

          {/* Instructional text */}
          <p className="mb-4 ml-1">
            Let us know what features you&lsquo;d like to see on WishCraft!
          </p>

          {/* Form with custom input and textarea components */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <CustomInputField
              label="GIVE A TITLE"
              type="text"
              name="title"
              placeholder="Please write a short title"
              register={register}
              errors={errors}
            />

            <CustomTextarea
              label="DETAILS"
              name="description"
              placeholder="Additional details of your request"
              register={register}
              errors={errors}
            />

            {/* Submit button with custom loading state */}
            <CustomFormButton
              buttonText={"REQUEST FEATURE"}
              loadingText={"REQUESTING NEW FEATURE..."}
              loading={formSubmit}
              color={"custom"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFeatureRequest;
