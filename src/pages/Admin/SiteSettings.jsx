import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { updateWebsiteInfo } from "../../services/apis/Website";
import { WebsiteContext } from "../../context/WebsiteContextProvider";
import CustomInputField from "../../components/CustomComponents/CustomInputField";
import CustomTextarea from "../../components/CustomComponents/CustomTextarea";
import CustomFormButton from "../../components/CustomComponents/CustomFormButton";
import CustomSelect from "../../components/CustomComponents/CustomSelect";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import ImageUpload from "../../components/ImageUpload";

const SiteSettings = () => {
  // Accessing the website information context
  const { websiteInfo, setRefetch } = useContext(WebsiteContext);

  const imgURL = import.meta.env.VITE_IMAGE_URL;
  const image = `${imgURL}/${websiteInfo.logoUrl}`;

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
      setValue("boardStatus", websiteInfo.boardStatus);
      setValue("sortingOrder", websiteInfo.sortingOrder);
    }
  }, [websiteInfo, setValue]);

  // Handling form submission
  const handleFormSubmit = async (data) => {
    // Checking if the form data is different from the initial values
    const isDataChanged =
      data.name !== websiteInfo.name ||
      data.title !== websiteInfo.title ||
      data.description !== websiteInfo.description ||
      data.logoUrl !== websiteInfo.logoUrl ||
      data.sortingOrder !== websiteInfo.sortingOrder ||
      data.boardStatus !== websiteInfo.boardStatus;

    // If no changes, display a toast message and return
    if (!isDataChanged) {
      toast.info("No changes detected");
      return;
    }

    const updatedInfo = {
      name: data.name,
      title: data.title,
      description: data.description,
      logoUrl: data.logoUrl,
      sortingOrder: data.sortingOrder,
      boardStatus: data.boardStatus,
    };

    try {
      // Set loading state to true during form submission
      setLoading(true);

      // Make API request to update website information
      const response = await updateWebsiteInfo(updatedInfo);

      if (response) {
        // Display success toast and trigger a refetch in the context
        toast.success("Website info updated successfully");
        setRefetch((prevRefetch) => !prevRefetch);
      }
    } catch (error) {
      // Display error toast if there's an issue with the API request
      console.error("Error updating website info:", error);
      toast.error(error);
    } finally {
      // Set loading state back to false after form submission is complete
      setLoading(false);
    }
  };

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const sortingOrderOptions = [
    { value: "MostVoted", label: "Most Voted" },
    { value: "NewestFirst", label: "Newest First" },
    { value: "OldestFirst", label: "Oldest First" },
  ];

  return (
    <>
      <CustomHelmet pageName={"Settings"} />
      <div className="max-w-screen-xl pt-6 px-4 w-full mx-auto">
        <div className="lg:flex gap-6 overflow-hidden dark:bg-gray-800">
          <div className="lg:w-7/12 bg-white shadow-lg rounded">
            <h2 className="p-2 font-bold text-2xl ml-5 font-mono">Settings</h2>
            <hr />
            {/* Form for updating website information */}
            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className="px-6 pb-6"
            >
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
              <CustomSelect
                label="Board Status"
                options={statusOptions}
                register={register}
                name="boardStatus"
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
          <div className="lg:w-5/12 my-4 lg:m-0 bg-white shadow-lg rounded ">
            <h2 className="p-2 font-bold text-2xl ml-5 font-mono text-center">
              Website Info&apos;s
            </h2>
            <hr />
            <div className="px-6 pb-6 pt-4">
              <div className="flex flex-col items-center -mx-2">
                <img
                  className="object-cover w-24 h-24 mx-2 rounded-full"
                  src={image}
                  alt="logo"
                />
                <h4 className="mx-2 mt-4 font-medium text-gray-800 text-2xl">
                  {websiteInfo.name}
                </h4>
                <p className="mx-2 mt-4 text-lg font-medium text-gray-600">
                  {websiteInfo.title}
                </p>
                <p className="mx-2 mt-4 text-sm font-medium text-gray-600 text-center">
                  {websiteInfo.description}
                </p>
                {/* image upload  */}
                <ImageUpload />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteSettings;
