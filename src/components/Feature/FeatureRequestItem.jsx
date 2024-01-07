import { Link } from "react-router-dom";
import { CustomDateFormat } from "../../utils/CustomDateFormat";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import getInitials from "../../utils/getInitials";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import { updateFeatureRequestLikesById } from "../../services/apis/Feature";

const FeatureRequestItem = ({ feature }) => {
  const { user } = useContext(AuthContext);

  const {
    _id,
    comments,
    createdAt,
    createdBy,
    description,
    likes,
    status,
    title,
  } = feature;

  // Extract emails of users who liked
  const likedUserEmails = likes?.users?.map((user) => user.email);

  const [isLiked, setIsLiked] = useState(likedUserEmails.includes(user?.email));

  const [likeCount, setLikeCount] = useState(feature?.likes?.count);

  const handleLike = () => {
    try {
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      setIsLiked(true);

      updateFeatureRequestLikes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUnlike = () => {
    try {
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
      setIsLiked(false);

      updateFeatureRequestLikes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateFeatureRequestLikes = async () => {
    try {
      const updatedFeature = await updateFeatureRequestLikesById(feature._id);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="px-4 py-2 bg-white rounded-lg drop-shadow-md mb-4">
      <div className="flex items-center justify-between">
        <h3 className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer capitalize">
          {status}
        </h3>
        <span className="text-sm font-light text-gray-600">
          {CustomDateFormat(createdAt)}
        </span>
      </div>

      <Link to={`/feature-requests/${_id}`}>
        <h4 className="mt-1 text-xl font-semibold text-gray-700 hover:text-gray-600 hover:underline whitespace-normal break-words">
          {title}
        </h4>
        <p className="mt-1 text-gray-600 whitespace-normal break-words">
          {description}
        </p>
      </Link>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 sm:gap-4">
          {isLiked ? (
            <>
              <BiSolidLike
                className="text-xl cursor-pointer"
                onClick={handleUnlike}
              />
              {likeCount}
            </>
          ) : (
            <>
              <BiLike className="text-xl cursor-pointer" onClick={handleLike} />
              {likeCount}
            </>
          )}

          <Link to={`/feature-requests/${_id}`} className="flex gap-2">
            <FaRegComments className="text-xl" />
            {comments.count}
          </Link>
        </div>

        <div className="flex items-center">
          {createdBy.photoURL ? (
            <img
              className="object-cover w-6 h-6 mx-2 rounded-full sm:block"
              src={createdBy.photoURL}
              alt="avatar"
            />
          ) : (
            <div className="w-6 h-6 mx-2 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
              {getInitials(createdBy.name)}
            </div>
          )}
          <div className="text-gray-700 cursor-pointer text-sm">
            {createdBy.name || user.displayName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestItem;
