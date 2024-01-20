import { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditFeature = ({ editedFeature, onSave, onCancel }) => {
  const { register, handleSubmit, setValue } = useForm();

  // Set initial form values when the component mounts
  useEffect(() => {
    setValue("title", editedFeature?.title);
    setValue("description", editedFeature?.description);
  }, [editedFeature, setValue]);

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Title
        </label>
        <input
          type="text"
          {...register("title")}
          id="title"
          className="block w-full text-gray-700 bg-slate-100 border rounded-lg mt-0 p-2 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-2"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Description
        </label>
        <textarea
          {...register("description")}
          id="description"
          className="block w-full text-gray-700 bg-slate-100 border rounded-lg mt-0 p-2 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-2"
          rows="4"
        />
      </div>
      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="px-6 rounded py-1 bg-green-500 hover:bg-green-600 text-white"
        >
          Save
        </button>

        <button
          type="button"
          className="px-6 rounded py-1 bg-red-500 hover:bg-red-600 text-white"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditFeature;
