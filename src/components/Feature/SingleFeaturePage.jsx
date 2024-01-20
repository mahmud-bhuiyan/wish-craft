import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import Loader from "../Loader";
import AvatarWithText from "./AvatarWithText";
import LikeButton from "./LikeButton";
import AddFeatureComment from "./AddFeatureComment";
import CustomDateFormat from "../../utils/CustomDateFormat";
import DisplayComments from "./DisplayComments";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import { getSingleFeatureRequest } from "../../services/apis/Feature";
import CustomHelmet from "../CustomComponents/CustomHelmet";
import { getStatusColor } from "../../utils/getStatusColor";

const SingleFeaturePage = () => {
  // Retrieve feature id from URL params
  const { id } = useParams();

  // State to hold the feature data and trigger refresh
  const [feature, setFeature] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Access to FeaturesContext for global state management
  const { setRefetch } = useContext(FeaturesContext);

  // Fetch feature data on component mount or refresh
  useEffect(() => {
    const fetchFeature = async () => {
      try {
        // Fetch feature data based on the id
        const featureData = await getSingleFeatureRequest(id);
        setFeature(featureData.feature);
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    // Trigger the fetch on mount or when refresh state changes
    fetchFeature();
  }, [id, refresh]);

  // If feature data is still loading, display a loader
  if (!feature) {
    return <Loader />;
  }

  const {
    _id,
    title,
    description,
    status,
    createdAt,
    createdBy,
    likes,
    comments,
  } = feature;

  return (
    <>
      <CustomHelmet pageName={"Feature Request"} />
      <div className="max-w-screen-xl mx-auto">
        <div className="mx-1 sm:mx-2 my-4">
          <div className="lg:flex bg-white rounded-lg p-1">
            {/* Left div: Back to all posts link */}
            <div className="lg:w-1/3 hidden lg:flex lg:order-first p-2 sm:p-4 border-2 m-2 sm:m-3 rounded-lg">
              <Link
                to="/"
                onClick={() => setRefetch((prevRefresh) => !prevRefresh)}
                className="w-full h-10 bg-[#F0F0F0] rounded p-2 flex gap-2 justify-center items-center"
              >
                <IoReturnUpBackSharp className="text-2xl" />
                SEE ALL POSTS
              </Link>
            </div>

            {/* Right div: Feature details */}
            <div className="flex-1 p-2 sm:p-4 border-2 m-2 sm:m-3 rounded-lg">
              {/* Back to all posts link for smaller screens */}
              <Link
                to="/"
                onClick={() => setRefetch((prevRefresh) => !prevRefresh)}
                className="btn btn-sm lg:btn-md bg-[#F0F0F0] mb-4 lg:hidden"
              >
                <IoReturnUpBackSharp className="text-2xl" />
                BACK TO ALL POSTS
              </Link>

              {/* Feature title and status */}
              <div className="mb-4 lg:px-3">
                <span className="text-xl font-semibold whitespace-normal break-words mr-2">
                  {title}
                </span>
                <span
                  className="px-2 py-1.5 text-sm font-semibold transition-colors duration-300 transform rounded cursor-pointer uppercase"
                  style={getStatusColor(status)}
                >
                  {status}
                </span>
              </div>

              {/* Display creator's avatar and text */}
              <AvatarWithText userData={createdBy} />

              {/* Feature description */}
              <p className="text-gray-700 my-5 whitespace-normal break-words">
                {description}
              </p>

              {/* Display creation date */}
              <p className="flex align-middle gap-2 text-sm my-2">
                <MdOutlineDateRange className="text-xl" />
                {CustomDateFormat(createdAt, {
                  showTimeOff: true,
                })}
              </p>

              {/* Like button */}
              <div className="flex gap-2">
                <LikeButton id={_id} likes={likes} />
              </div>

              {/* Component to add a new comment */}
              <AddFeatureComment
                id={_id}
                setRefresh={setRefresh}
                setFeature={setFeature}
              />

              {/* Display Comments */}
              <DisplayComments
                feature={feature}
                comments={comments}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleFeaturePage;
