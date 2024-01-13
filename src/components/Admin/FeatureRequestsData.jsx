import { useState } from "react";
import { toast } from "react-toastify";
import { updateFeatureStatus } from "../../services/apis/Feature";
import { getStatusColor } from "../../utils/getStatusColor";

const FeatureRequestsData = ({ feature, index }) => {
  const { _id, title, description, createdBy, status } = feature;
  const [newStatus, setNewStatus] = useState(status);
  const [localLoading, setLocalLoading] = useState(false);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      // Check if the new status is different from the existing status
      if (newStatus === status) {
        toast.info("Nothing to update.");
        return;
      }

      // Set local loading state to true before making the API call
      setLocalLoading(true);

      const response = await updateFeatureStatus(_id, newStatus);

      if (response.feature) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <tr key={_id}>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {index + 1}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">{title}</td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {description}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {createdBy?.name}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800 uppercase flex justify-center">
        <select
          value={newStatus}
          onChange={handleStatusChange}
          className="body-large mb-0 flex h-10 w-3/4 rounded-md border border-input bg-[#F6F2F7] text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#78767A] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-[#C8C5CA] disabled:cursor-not-allowed disabled:opacity-50 text-center"
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

      <td className="py-2 px-4 text-sm font-normal text-gray-800 align-middle gap-4">
        <button
          onClick={handleUpdateStatus}
          disabled={localLoading}
          className="py-2 px-4 bg-blue-500 text-white rounded"
        >
          {localLoading ? "Updating" : "Update Status"}
        </button>
      </td>
    </tr>
  );
};

export default FeatureRequestsData;
