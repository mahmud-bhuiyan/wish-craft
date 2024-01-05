import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { TiArrowRight } from "react-icons/ti";
import { toast } from "react-toastify";

import CustomInputField from "../CustomComponents/CustomInputField";
import CustomTextarea from "../CustomComponents/CustomTextarea";
import CustomFormButton from "../CustomComponents/CustomFormButton";
import { createRequest } from "../../services/apis/Feature";
import { FeaturesContext } from "../../context/FeaturesContextProvider";

const CreateFeatureRequest = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const { setFeatures } = useContext(FeaturesContext);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const featureData = {
      title: data.title,
      description: data.description,
    };

    try {
      setFormSubmit(true);

      const response = await createRequest(featureData);

      if (response.feature._id) {
        toast.success(response.message);

        // Update features list in context
        setFeatures((prevFeatures) => [response.feature, ...prevFeatures]);

        // Redirect to the home page and show success message
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
    <div className="container mx-auto max-w-3xl">
      <Helmet>
        <title>Create Request | WishCraft</title>
      </Helmet>
      <div className="bg-white shadow-lg p-5 rounded-lg mb-2">
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl mb-2 ml-1">
            Create Feature Request
          </h2>
          <Link
            to="/"
            className="bg-[#F0F0F0] rounded p-2 flex gap-2 justify-center items-center"
          >
            SEE ALL POSTS
            <TiArrowRight className="text-2xl" />
          </Link>
        </div>
        <p className="mb-4 ml-1">
          Let us know what features you&lsquo;d like to see on WishCraft!
        </p>

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

          <div className="mt-4">
            <CustomFormButton
              buttonText={"REQUEST FEATURE"}
              loading={formSubmit}
              color={"custom"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFeatureRequest;
