import { Link } from "react-router-dom";
import { FaRegComments } from "react-icons/fa";
import CustomDateFormat from "../../utils/CustomDateFormat";
import AvatarWithText from "./AvatarWithText";
import LikeButton from "./LikeButton";
import { getStatusColor } from "../../utils/getStatusColor";

const FeatureRequestItem = ({ feature }) => {
  const {
    _id,
    totalComments,
    createdAt,
    createdBy,
    description,
    status,
    title,
    likes,
  } = feature;

  return (
    <div className="px-4 py-2 bg-white rounded-lg drop-shadow-md mb-4">
      <div className="flex items-center justify-between gap-2 py-1">
        <h3
          className="px-2 py-1.5 text-sm font-semibold transition-colors duration-300 transform rounded cursor-pointer uppercase"
          style={getStatusColor(status)}
        >
          {status}
        </h3>
        <span className="text-sm font-light text-gray-600 sm:hidden">
          {CustomDateFormat(createdAt, {
            showTimeOff: true,
          })}
        </span>
        <span className="text-sm font-light text-gray-600 hidden sm:flex">
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
        <div className="flex items-center gap-1 sm:gap-2">
          <LikeButton id={_id} likes={likes} />

          <Link to={`/feature-requests/${_id}`} className="flex gap-2 ml-2">
            <FaRegComments className="text-xl" />
            {totalComments}
          </Link>
        </div>

        <AvatarWithText userData={createdBy} />
      </div>
    </div>
  );
};

export default FeatureRequestItem;
