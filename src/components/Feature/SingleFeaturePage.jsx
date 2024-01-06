import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleFeatureRequest } from "../../services/apis/Feature";
import Loader from "../Loader";

const SingleFeaturePage = () => {
  const { id } = useParams();
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const featureData = await getSingleFeatureRequest(id);
        console.log(featureData.feature);
        setFeature(featureData.feature);
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    fetchFeature();
  }, [id]);

  if (!feature) {
    return <Loader />;
  }

  const { title, description, status, createdAt, createdBy, likes, comments } =
    feature;

  return (
    <div className="mx-2 my-4">
      <div className="lg:flex bg-white rounded-lg p-1">
        {/* Content for the left div */}
        <div className="lg:w-1/3 lg:order-first p-4 border-2 m-3 rounded-lg">
          <p>Left Column</p>
        </div>

        {/* Content for the right div */}
        <div className="flex-1 p-4 border-2 m-3 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">{title}</h2>
          <p className="text-gray-700 mb-2">{description}</p>

          <p>Status: {status}</p>
          <p>Created At: {createdAt}</p>

          <div className="flex items-center mb-4">
            <img
              className="object-cover w-6 h-6 mx-2 rounded-full"
              src={createdBy.photoURL}
              alt="avatar"
            />
            <p className="text-gray-700">{createdBy.name}</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex gap-2">
              <span>Likes: {likes.count}</span>
            </div>
            <div className="flex gap-2">
              <span>Comments: {comments.count}</span>
            </div>
          </div>

          {/* Display Comments */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {comments.count === 0 ? (
              <p>No comments yet.</p>
            ) : (
              <ul>
                {comments.data.map((comment) => (
                  <li key={comment._id}>
                    <p>{comment.comment}</p>
                    <p>Commented by: {comment.commentsBy.name}</p>
                    <p>Commented at: {comment.createdAt}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFeaturePage;
