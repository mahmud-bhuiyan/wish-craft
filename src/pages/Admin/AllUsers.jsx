import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { getAllUsers } from "../../services/apis/Admin";
import AllUsersData from "../../components/Admin/AllUsersData";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import CustomTableHeader from "../../components/Admin/CustomTableHeader";
import TableTotalDataCount from "../../components/Admin/TableTotalDataCount";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";

const AllUsers = () => {
  const { allUsers, setAllUsers } = useContext(UserContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers(currentPage, itemsPerPage);
        setAllUsers(usersData.users);
        setTotalUsers(usersData.pageInfo.totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [setAllUsers, setCurrentPage, itemsPerPage, currentPage]);

  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const hasMorePrev = currentPage > 1;
  const hasMoreNext = currentPage < totalPages;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDataPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const columns = ["#", "Name", "Email", "Role", "Action"];

  return (
    <>
      <CustomHelmet pageName={"All Users"} />
      <div className="p-4 w-full mx-auto">
        <Breadcrumbs
          fromPage={"Dashboard"}
          pageTitle={"Users"}
          fromURL={"/dashboard"}
        />

        <div className="sm:flex justify-between items-center mb-2.5 bg-white py-2 rounded-lg">
          <div className="relative sm:w-[90%] ml-4">
            <TableTotalDataCount
              title="Total"
              count={totalUsers}
              tableName={"Users"}
            />
          </div>

          <div className="flex items-center w-auto mt-3 sm:mt-0 justify-end">
            <label className="mr-2">Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) =>
                handleDataPerPageChange(parseInt(e.target.value))
              }
              className="border rounded p-1 mr-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  <CustomTableHeader columns={columns} />
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers.map((user, index) => (
                      <AllUsersData index={index} key={user._id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination controls */}
        <div className="mt-2 flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            hasMorePrev={hasMorePrev}
            hasMoreNext={hasMoreNext}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
