import { CustomDateFormat } from "../../utils/CustomDateFormat";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
import getInitials from "../../utils/getInitials";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";

const FeatureRequestItem = ({ feature }) => {
  const { user } = useContext(AuthContext);
  const { comments, createdAt, createdBy, description, likes, status, title } =
    feature;

  return (
    <div className="px-4 py-2 bg-white rounded-lg drop-shadow-md mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600">
          {CustomDateFormat(createdAt)}
        </span>
        <div className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer capitalize">
          {status}
        </div>
      </div>

      <div className="">
        <a
          className="text-xl font-bold text-gray-700 hover:text-gray-600 hover:underline"
          tabIndex="0"
          role="button"
        >
          {title}
        </a>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <BiLike />
            <BiSolidLike />
            {likes.count}
          </div>
          <div className="flex gap-2">
            <FaRegComments />
            {comments.count}
          </div>
        </div>

        <div className="flex items-center">
          {createdBy.photoURL ? (
            <>
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
                {createdBy.name}
              </div>
            </>
          ) : (
            <>
              {user.photoURL ? (
                <img
                  className="object-cover w-6 h-6 mx-2 rounded-full sm:block"
                  src={user.photoURL}
                  alt="avatar"
                />
              ) : (
                <div className="w-6 h-6 mx-2 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
                  {getInitials(user.displayName)}
                </div>
              )}

              <div className="text-gray-700 cursor-pointer text-sm">
                {user.displayName}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestItem;
