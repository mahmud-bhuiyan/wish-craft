import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleFeatureRequest } from "../../services/apis/Feature";
import Loader from "../Loader";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { CustomDateFormat } from "../../utils/CustomDateFormat";
import AvatarWithText from "../AvatarWithText";
import LikeButton from "./LikeButton";

const SingleFeaturePage = () => {
  const { id } = useParams();
  const [feature, setFeature] = useState(null);

  useEffect(() => {
    const fetchFeature = async () => {
      try {
        const featureData = await getSingleFeatureRequest(id);
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
    <div className="max-w-screen-xl mx-auto">
      <div className="mx-2 my-4">
        <div className="lg:flex bg-white rounded-lg p-1">
          {/* Content for the left div */}
          <div className="lg:w-1/3 hidden lg:flex lg:order-first p-4 border-2 m-3 rounded-lg">
            <Link
              to="/"
              className="w-full h-10 bg-[#F0F0F0] rounded p-2 flex gap-2 justify-center items-center"
            >
              <IoReturnUpBackSharp className="text-2xl" />
              SEE ALL POSTS
            </Link>
          </div>

          {/* Content for the right div */}
          <div className="flex-1 p-4 border-2 m-3 rounded-lg">
            <Link
              to="/"
              className="btn btn-sm lg:btn-md bg-[#F0F0F0] mb-4 lg:hidden"
            >
              <IoReturnUpBackSharp className="text-2xl" />
              BACK TO ALL POSTS
            </Link>
            <div className="mb-4 lg:px-3">
              <span className="text-xl font-semibold whitespace-normal break-words mr-2">
                {title}
              </span>
              <span className="px-3 py-1 text-sm text-white bg-gray-600 rounded cursor-pointer uppercase">
                {status}
              </span>
            </div>

            <AvatarWithText createdBy={createdBy} />

            <p className="text-gray-700 ml-8 my-4 whitespace-normal break-words lg:px-3 border-2 py-4 px-2 rounded">
              {description}
            </p>
            <p className="flex align-middle gap-2 text-sm my-2">
              <MdOutlineDateRange className="text-xl" />{" "}
              {CustomDateFormat(createdAt, false)}
            </p>
            <div className="flex gap-2">
              <LikeButton id={id} likes={likes} />
            </div>
            {/* Display Comments */}
            <div>
              <h3 className="font-semibold mt-4 mb-2">Comments</h3>
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
    </div>
  );
};

export default SingleFeaturePage;
