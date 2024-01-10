import { MdOutlineAdminPanelSettings, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { softDeleteUserById } from "../../services/apis/Admin";
import Swal from "sweetalert2";

const AllUsersData = ({ user, index, setRefetch }) => {
  console.log(user);
  const { _id, name, email, role } = user;

  const handleDelete = async () => {
    // Display confirmation dialog
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, delete user`,
    });

    // If user confirms the deletion
    if (confirmationResult.isConfirmed) {
      try {
        const response = await softDeleteUserById(_id);
        setRefetch((prevRefetch) => !prevRefetch);
        toast.success(response.message);
      } catch (error) {
        console.error(error);
        toast.error("Failed to delete user");
      }
    }
  };

  return (
    <tr key={_id}>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {index + 1}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">{name}</td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">{email}</td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">{role}</td>

      <td className="py-2 px-4 text-sm font-normal text-gray-800 flex justify-center align-middle gap-4">
        <div className="tooltip-top tooltip" data-tip="Make Admin">
          <MdOutlineAdminPanelSettings className="text-2xl text-blue-400" />
        </div>
        <div
          className="tooltip-top tooltip"
          data-tip="Delete"
          onClick={handleDelete}
        >
          <MdDelete className="text-2xl text-red-500 cursor-pointer" />
        </div>
      </td>
    </tr>
  );
};

export default AllUsersData;
