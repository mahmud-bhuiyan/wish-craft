import { useState } from "react";
import { toast } from "react-toastify";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { getStatusColor } from "../../utils/getStatusColor";
import {
  deleteFeatureRequest,
  updateFeatureStatus,
} from "../../services/apis/Feature";

const FeatureRequestsData = ({ feature, index, setRefetch }) => {
  const { _id, title, description, createdBy, status } = feature;
  const [newStatus, setNewStatus] = useState(status);
  const [localLoading, setLocalLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const selectedStatus = e.target.value;

    // Check if the new status is different from the existing status
    if (selectedStatus === status) {
      toast.info("Nothing to update.");
      return;
    }

    try {
      // Set local loading state to true before making the API call
      setLocalLoading(true);

      const response = await updateFeatureStatus(_id, selectedStatus);

      if (response.feature) {
        toast.success(response.message);
        // Update the local state to reflect the new status
        setNewStatus(selectedStatus);
        // Trigger a refetch of the features
        setRefetch((prevRefetch) => !prevRefetch);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error);
    } finally {
      setLocalLoading(false);
    }
  };

  const handleDeleteRequest = async () => {
    // Use SweetAlert for confirmation
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmationResult.isConfirmed) {
      try {
        // Set local loading state to true
        setLocalLoading(true);

        // Call the API to delete the feature request
        const response = await deleteFeatureRequest(_id);

        if (response) {
          toast.success(response.message);
          // Trigger a refetch of the features
          setRefetch((prevRefetch) => !prevRefetch);
        }
      } catch (error) {
        console.error("Error deleting feature request:", error);
        toast.error("Error deleting feature request");
      } finally {
        setLocalLoading(false);
      }
    }
  };

  return (
    <tr key={_id}>
      <td className="py-1.5 px-2 text-sm font-normal text-gray-800">
        {index + 1}
      </td>
      <td className="py-1.5 px-2 text-sm font-normal text-gray-800">{title}</td>
      <td className="py-1.5 px-2 text-sm font-normal text-gray-800">
        {description}
      </td>
      <td className="py-1.5 px-2 text-sm font-normal text-gray-800">
        {createdBy?.name}
      </td>
      <td className="py-1.5 px-2 text-sm font-normal text-gray-800 uppercase flex justify-center">
        <select
          value={newStatus}
          onChange={handleStatusChange}
          className="body-large mb-0 flex h-9 w-3/4 rounded-md border border-input bg-[#F6F2F7] text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50 text-center"
          style={getStatusColor(newStatus)}
        >
          <option
            value="pending"
            style={{ backgroundColor: "#FAD02E", color: "black" }}
          >
            Pending
          </option>
          <option
            value="under-review"
            style={{ backgroundColor: "#B0BEC5", color: "black" }}
          >
            Under Review
          </option>
          <option
            value="planned"
            style={{ backgroundColor: "#66BB6A", color: "black" }}
          >
            Planned
          </option>
          <option
            value="in-progress"
            style={{ backgroundColor: "#4FC3F7", color: "black" }}
          >
            In Progress
          </option>
          <option
            value="complete"
            style={{ backgroundColor: "#81C784", color: "black" }}
          >
            Complete
          </option>
        </select>
      </td>

      <td className="text-sm">
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={handleDeleteRequest}
            disabled={localLoading}
            className="tooltip-top tooltip"
            data-tip="Delete"
          >
            <MdDelete
              className={`text-2xl ${
                localLoading
                  ? "text-red-300 cursor-not-allowed"
                  : "text-red-500 cursor-pointer"
              }  `}
            />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default FeatureRequestsData;
