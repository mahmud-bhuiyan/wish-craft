import { useContext } from "react";
import { AuthContext } from "../../context/AuthContextProvider";
import getInitials from "../../utils/getInitials";

const AvatarWithText = ({ userData }) => {
  const { user } = useContext(AuthContext);
  const { name, photoURL } = userData;

  return (
    <div className="flex items-center">
      {photoURL ? (
        <img
          className="object-cover w-6 h-6 mr-2 rounded-full sm:block"
          src={photoURL}
          alt="avatar"
        />
      ) : (
        <div className="w-6 h-6 mr-2 flex items-center justify-center rounded-full bg-[#4FC3F7] text-white">
          {getInitials(name)}
        </div>
      )}
      <div className="text-gray-700 cursor-pointer text-sm capitalize">
        {name || user.displayName}
      </div>
    </div>
  );
};

export default AvatarWithText;
