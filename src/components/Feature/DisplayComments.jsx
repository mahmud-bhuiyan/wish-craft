import { useContext, useState } from "react";
import AvatarWithText from "./AvatarWithText";
import CustomDateFormat from "../../utils/CustomDateFormat";
import EditCommentForm from "./EditCommentForm"; // Assuming you have a separate component for editing comments
import DeleteComment from "./DeleteComment";
import { AuthContext } from "../../context/AuthContextProvider";

const DisplayComments = ({ feature, comments, setRefresh }) => {
  const [editingCommentId, setEditingCommentId] = useState(null);

  const handleEditComment = (commentId) => {
    setEditingCommentId(commentId);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
  };

  const { user } = useContext(AuthContext);

  return (
    <div>
      <h3 className="font-semibold mt-4 mb-2">Comments</h3>
      {comments.count === 0 ? (
        <p>No comments yet.</p>
      ) : (
        <ul>
          {comments.data.map((comment) => (
            <li key={comment._id} className="py-3">
              <AvatarWithText userData={comment.commentsBy} />

              {editingCommentId === comment._id ? (
                <EditCommentForm
                  featureId={feature._id}
                  comment={comment}
                  onCancel={handleCancelEdit}
                  setRefresh={setRefresh}
                />
              ) : (
                <>
                  <p className="sm:mt-2 ml-8">{comment.comment}</p>
                  <div className="flex">
                    <p className="sm:mt-2 ml-8 text-slate-500 text-sm">
                      {CustomDateFormat(comment.createdAt, {
                        timeInWords: true,
                      })}
                    </p>
                    {user.email === comment.commentsBy.email ? (
                      <button
                        className="ml-4 text-blue-500 hover:underline sm:pt-2"
                        onClick={() => handleEditComment(comment._id)}
                      >
                        Edit
                      </button>
                    ) : null}
                    <DeleteComment
                      feature={feature}
                      commentUser={comment.commentsBy}
                      featureId={feature._id}
                      commentId={comment._id}
                      setRefresh={setRefresh}
                    />
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayComments;
