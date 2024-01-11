import AvatarWithText from "./AvatarWithText";
import DeleteComment from "./DeleteComment";
import CustomDateFormat from "../../utils/CustomDateFormat";

const DisplayComments = ({ feature, comments, setRefresh }) => {
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
              <p className="sm:mt-2 ml-8">{comment.comment}</p>
              <div className="flex">
                <p className="sm:mt-2 ml-8 text-slate-500 text-sm">
                  {CustomDateFormat(comment.createdAt, {
                    timeInWords: true,
                  })}
                </p>
                <DeleteComment
                  feature={feature}
                  commentUser={comment.commentsBy}
                  featureId={feature._id}
                  commentId={comment._id}
                  setRefresh={setRefresh}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DisplayComments;
