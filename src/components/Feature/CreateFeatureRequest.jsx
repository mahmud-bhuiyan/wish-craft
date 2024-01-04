import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { TiArrowRight } from "react-icons/ti";

import CustomInputField from "../CustomComponents/CustomInputField";
import CustomTextarea from "../CustomComponents/CustomTextarea";
import CustomFormButton from "../CustomComponents/CustomFormButton";

const CreateFeatureRequest = () => {
  const [formSubmit, setFormSubmit] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    setFormSubmit(true);
    // Handle form submission logic here
    console.log(data);
    reset();
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <Helmet>
        <title>Create Request | WishCraft</title>
      </Helmet>
      <div className="bg-white shadow-lg p-5 rounded-lg mb-2">
        <div className="flex justify-between">
          <h2 className="font-semibold text-2xl mb-2">
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
        <p className="mb-3">
          Let us know what features you&lsquo;d like to see on WishCraft!
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomInputField
            label="GIVE A TITLE"
            type="text"
            name="name"
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
