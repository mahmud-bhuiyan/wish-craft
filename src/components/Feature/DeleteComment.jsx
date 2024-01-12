import { useContext, useState } from "react";
import { deleteFeatureComment } from "../../services/apis/Feature";
import { AuthContext } from "../../context/AuthContextProvider";

const DeleteComment = ({ commentUser, featureId, commentId, setRefresh }) => {
  const { user } = useContext(AuthContext);

  const [matched, setMatched] = useState(commentUser?.email === user?.email);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      await deleteFeatureComment(featureId, commentId);

      // Trigger a refetch
      setRefresh((prevRefetch) => !prevRefetch);
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  // Return null if there is no user
  if (!user) {
    return null;
  }

  return (
    <>
      {matched && (
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className="text-slate-500 hover:text-red-400 text-sm cursor-pointer pt-2 pl-2 font-semibold"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      )}
    </>
  );
};

export default DeleteComment;
