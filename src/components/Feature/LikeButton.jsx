import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContextProvider";
import {
  likeFeatureRequestById,
  unlikeFeatureRequestById,
} from "../../services/apis/Feature";
import { FeaturesContext } from "../../context/FeaturesContextProvider";

const LikeButton = ({ id, likes }) => {
  const { user } = useContext(AuthContext);
  const { setRefetch } = useContext(FeaturesContext);
  const navigate = useNavigate();

  // Extract emails of users who liked
  const likedUserEmails = likes?.users?.map((user) => user.email);

  const [isLiked, setIsLiked] = useState(likedUserEmails.includes(user?.email));

  const [likeCount, setLikeCount] = useState(likes?.count);

  const updateFeatureRequestLikes = async (action) => {
    try {
      let response;

      if (action === "like") {
        response = await likeFeatureRequestById(id);
        if (response.feature._id) {
          toast.success(response.message);
        }
      } else if (action === "unlike") {
        response = await unlikeFeatureRequestById(id);
        if (response.feature._id) {
          toast.info(response.message);
        }
      }
      // Trigger a refetch of the features
      setRefetch((prevRefetch) => !prevRefetch);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLike = () => {
    try {
      if (!user?.email) {
        navigate("/auth/login");
        return;
      }

      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      setIsLiked(true);
      updateFeatureRequestLikes("like");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUnlike = () => {
    try {
      if (!user?.email) {
        navigate("/auth/login");
        return;
      }

      setLikeCount((prevLikeCount) => prevLikeCount - 1);
      setIsLiked(false);
      updateFeatureRequestLikes("unlike");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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
    </>
  );
};

export default LikeButton;
