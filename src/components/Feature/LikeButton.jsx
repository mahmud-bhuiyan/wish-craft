import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContextProvider";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import {
  likeFeatureRequestById,
  unlikeFeatureRequestById,
} from "../../services/apis/Feature";

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
      } else if (action === "unlike") {
        response = await unlikeFeatureRequestById(id);
      }

      if (response.feature._id) {
        setRefetch(true);
      }
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
      toast.success("You liked the post!");
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
      toast.info("You unlike the post!");
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
