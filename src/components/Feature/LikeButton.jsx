import { useContext, useState } from "react";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContextProvider";
import { updateFeatureRequestLikesById } from "../../services/apis/Feature";
import { toast } from "react-toastify";

const LikeButton = ({ id, likes }) => {
  const { user } = useContext(AuthContext);

  // Extract emails of users who liked
  const likedUserEmails = likes?.users?.map((user) => user.email);

  const [isLiked, setIsLiked] = useState(likedUserEmails.includes(user?.email));

  const [likeCount, setLikeCount] = useState(likes?.count);

  const handleLike = () => {
    try {
      setLikeCount((prevLikeCount) => prevLikeCount + 1);
      setIsLiked(true);
      toast.success("You liked the post!");
      updateFeatureRequestLikes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUnlike = () => {
    try {
      setLikeCount((prevLikeCount) => prevLikeCount - 1);
      setIsLiked(false);
      toast.info("You unlike the post!");
      updateFeatureRequestLikes();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateFeatureRequestLikes = async () => {
    try {
      const response = await updateFeatureRequestLikesById(id);
      console.log(response);
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
