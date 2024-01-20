import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { editCommentById } from "../../services/apis/Feature";

const EditCommentForm = ({ featureId, comment, onCancel, setRefresh }) => {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      editedComment: comment.comment,
    },
  });

  const onSubmit = async (data) => {
    if (data.editedComment === comment.comment) {
      toast.info("No changes to the comment.");
    } else {
      const response = await editCommentById(
        featureId,
        comment._id,
        data.editedComment
      );
      if (response.success) {
        // Trigger a refetch
        setRefresh((prevRefetch) => !prevRefetch);
        onCancel();
        toast.success(response.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="ml-8 mt-1">
      <textarea
        {...register("editedComment")}
        className="block w-full text-gray-700 bg-slate-100 border rounded-lg mt-0 p-2 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 mb-2"
        rows="2"
      />
      <div className="flex mt-2">
        <button
          type="submit"
          className="px-6 rounded py-1 bg-green-500 hover:bg-green-600 text-white"
        >
          Save
        </button>
        <button
          type="button"
          className="px-6 rounded py-1 bg-red-500 hover:bg-red-600 text-white ml-2"
          onClick={() => {
            onCancel();
            setValue("editedComment", comment.comment);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditCommentForm;
