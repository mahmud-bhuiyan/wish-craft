import { useContext } from "react";
import getInitials from "../utils/getInitials";
import { AuthContext } from "../context/AuthContextProvider";

const AvatarWithText = ({ createdBy }) => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="flex items-center">
      {createdBy.photoURL ? (
        <img
          className="object-cover w-6 h-6 mr-2 rounded-full sm:block"
          src={createdBy.photoURL}
          alt="avatar"
        />
      ) : (
        <div className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-gray-300 text-gray-700">
          {getInitials(createdBy.name)}
        </div>
      )}
      <div className="text-gray-700 cursor-pointer text-sm">
        {createdBy.name || user.displayName}
      </div>
    </div>
  );
};

export default AvatarWithText;
