import { useState } from "react";
import { updateFeatureStatus } from "../../services/apis/Feature";
import { toast } from "react-toastify";

const FeatureRequestsData = ({ feature, index }) => {
  const { _id, title, description, createdBy, status } = feature;
  const [newStatus, setNewStatus] = useState(status);

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      const response = await updateFeatureStatus(_id, newStatus);

      if (response.feature) {
        toast.success(response.message);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return { backgroundColor: "#FAD02E", color: "black" };
      case "under-review":
        return { backgroundColor: "#B0BEC5", color: "black" };
      case "planned":
        return { backgroundColor: "#66BB6A", color: "black" };
      case "in-progress":
        return { backgroundColor: "#4FC3F7", color: "black" };
      case "complete":
        return { backgroundColor: "#81C784", color: "black" };
      default:
        return {};
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
      <td className="py-2 px-4 text-sm font-normal text-gray-800 uppercase">
        <select
          value={newStatus}
          onChange={handleStatusChange}
          className="text-sm text-slate-700"
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
        <button
          onClick={handleUpdateStatus}
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
        >
          Update Status
        </button>
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800 flex justify-center align-middle gap-4"></td>
    </tr>
  );
};

export default FeatureRequestsData;
