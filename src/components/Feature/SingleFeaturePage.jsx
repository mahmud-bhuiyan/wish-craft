import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoReturnUpBackSharp } from "react-icons/io5";
import { MdDelete, MdOutlineDateRange } from "react-icons/md";
import { LuClipboardEdit } from "react-icons/lu";
import Loader from "../Loader";
import AvatarWithText from "./AvatarWithText";
import LikeButton from "./LikeButton";
import AddFeatureComment from "./AddFeatureComment";
import CustomDateFormat from "../../utils/CustomDateFormat";
import DisplayComments from "./DisplayComments";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import {
  deleteFeatureRequestById,
  getSingleFeatureRequest,
  updateFeatureRequestById,
} from "../../services/apis/Feature";
import CustomHelmet from "../CustomComponents/CustomHelmet";
import { getStatusColor } from "../../utils/getStatusColor";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContextProvider";
import EditFeature from "./EditFeature";

const SingleFeaturePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feature, setFeature] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedFeature, setEditedFeature] = useState(null);

  const { setRefetch } = useContext(FeaturesContext);
  const { user } = useContext(AuthContext);

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
  }, [id, refresh]);

  const handleDelete = async () => {
    Swal.fire({
      title: "Confirm Delete",
      text: "Are you sure you want to delete this feature?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (resultSwal) => {
      if (resultSwal.isConfirmed) {
        const result = await deleteFeatureRequestById(id);

        if (result.success) {
          toast.success(result.message);
          // Trigger a refetch of the features
          setRefetch((prevRefetch) => !prevRefetch);

          // Redirect to the home page and reset the form
          navigate("/");
        }
      }
    });
  };

  const handleEdit = () => {
    setIsEditMode(true);
    setEditedFeature({
      title: feature.title,
      description: feature.description,
    });
  };

  const handleSave = async (data) => {
    try {
      const result = await updateFeatureRequestById(id, data);

      if (result.success) {
        toast.success(result.message);
        setRefetch((prevRefetch) => !prevRefetch);
        setIsEditMode(false);
        setRefresh((prevRefresh) => !prevRefresh);
      }
    } catch (error) {
      console.error("Error updating feature:", error);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
  };

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
      <CustomHelmet
        pageName={isEditMode ? "Edit Feature Request" : "Feature Request"}
      />
      <div className="max-w-screen-xl mx-auto">
        <div className="mx-1 sm:mx-2 my-4">
          <div className="lg:flex bg-white rounded-lg p-1">
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

            <div className="flex-1 p-2 sm:p-4 border-2 m-2 sm:m-3 rounded-lg">
              <Link
                to="/"
                onClick={() => setRefetch((prevRefresh) => !prevRefresh)}
                className="btn btn-sm lg:btn-md bg-[#F0F0F0] mb-4 lg:hidden"
              >
                <IoReturnUpBackSharp className="text-2xl" />
                BACK TO ALL POSTS
              </Link>

              <div className="flex justify-between">
                <div className="mb-4 lg:px-3 w-3/4">
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
                {user?.email === createdBy?.email ? (
                  <div className="w-auto">
                    <div
                      className="tooltip-top tooltip mx-1"
                      data-tip="Edit"
                      onClick={handleEdit}
                    >
                      <LuClipboardEdit className="text-2xl text-blue-500 cursor-pointer" />
                    </div>
                    <div
                      className="tooltip-top tooltip"
                      data-tip="Delete"
                      onClick={handleDelete}
                    >
                      <MdDelete className="text-2xl text-red-500 cursor-pointer" />
                    </div>
                  </div>
                ) : null}
              </div>

              <AvatarWithText userData={createdBy} />

              {isEditMode ? (
                <EditFeature
                  editedFeature={editedFeature}
                  onSave={handleSave}
                  onCancel={handleCancel}
                  setRefresh={setRefresh}
                />
              ) : (
                <>
                  <p className="text-gray-700 my-5 whitespace-normal break-words">
                    {description}
                  </p>
                  <p className="flex align-middle gap-2 text-sm my-2">
                    <MdOutlineDateRange className="text-xl" />
                    {CustomDateFormat(createdAt, {
                      showTimeOff: true,
                    })}
                  </p>
                  <div className="flex gap-2">
                    <LikeButton id={_id} likes={likes} />
                  </div>
                  <AddFeatureComment
                    id={_id}
                    setRefresh={setRefresh}
                    setFeature={setFeature}
                  />
                  <DisplayComments
                    feature={feature}
                    comments={comments}
                    setRefresh={setRefresh}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleFeaturePage;
