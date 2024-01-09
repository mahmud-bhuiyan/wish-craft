import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const AllUsersData = ({ user, index }) => {
  console.log(user);
  const { _id, name, email, role } = user;
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
        <div className="tooltip-top tooltip" data-tip="Delete">
          <MdDelete className="text-2xl text-red-500" />
        </div>
      </td>
    </tr>
  );
};

export default AllUsersData;
