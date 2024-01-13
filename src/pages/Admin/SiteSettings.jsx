import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { WebsiteContext } from "../../context/WebsiteContextProvider";
import CustomInputField from "../../components/CustomComponents/CustomInputField";
import CustomTextarea from "../../components/CustomComponents/CustomTextarea";
import CustomFormButton from "../../components/CustomComponents/CustomFormButton";
import CustomSelect from "../../components/CustomComponents/CustomSelect";

const SiteSettings = () => {
  // Accessing the website information context
  const { websiteInfo, setRefetch } = useContext(WebsiteContext);

  // State to manage loading state during form submission
  const [loading, setLoading] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  // Set default values for the form fields based on websiteInfo
  useEffect(() => {
    if (websiteInfo) {
      setValue("name", websiteInfo.name);
      setValue("title", websiteInfo.title);
      setValue("description", websiteInfo.description);
      setValue("logoUrl", websiteInfo.logoUrl);
      setValue("status", websiteInfo.status);
      setValue("sortingOrder", websiteInfo.sortingOrder);
    }
  }, [websiteInfo, setValue]);

  // Handling form submission
  const handleFormSubmit = async (data) => {
    const updatedInfo = {
      name: data.name,
      title: data.title,
      description: data.description,
      logoUrl: data.logoUrl,
      sortingOrder: data.sortingOrder,
      status: data.status,
    };

    console.log(updatedInfo);
  };

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Archived", label: "Archived" },
  ];

  const sortingOrderOptions = [
    { value: "MostVoted", label: "Most Voted" },
    { value: "NewestFirst", label: "Newest First" },
    { value: "OldestFirst", label: "Oldest First" },
  ];

  return (
    <>
      <Helmet>
        <title>Settings | WishCraft</title>
      </Helmet>

      <div className="max-w-screen-xl p-4 my-4 w-full mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 p-10">
          <div className="mx-10">
            {/* Form for updating website information */}
            <form onSubmit={handleSubmit(handleFormSubmit)}>
              {/* Custom input field for website name */}
              <CustomInputField
                label="Website Name"
                type="text"
                name="name"
                placeholder="Website Name"
                register={register}
                errors={errors}
              />
              {/* Custom input field for homepage title */}
              <CustomInputField
                label="Homepage Title"
                type="text"
                name="title"
                placeholder="Homepage Title"
                register={register}
                errors={errors}
              />
              {/* Custom textarea for website description */}
              <CustomTextarea
                label="Description"
                name="description"
                placeholder="Write Description"
                register={register}
                errors={errors}
              />
              {/* Custom input field for logo URL */}
              <CustomInputField
                label="Logo URL"
                type="text"
                name="logoUrl"
                placeholder="Logo URL"
                register={register}
                errors={errors}
              />

              <CustomSelect
                label="Status Board"
                options={statusOptions}
                register={register}
                name="status"
                errors={errors}
              />
              <CustomSelect
                label="Features Sorting Order"
                id="sortingOrder"
                options={sortingOrderOptions}
                register={register}
                name="sortingOrder"
                errors={errors}
              />

              {/* Custom button for submitting the form */}
              <CustomFormButton
                buttonText={"Update Website Info"}
                loading={loading}
                loadingText={"Updating Website Info"}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteSettings;
