import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { getAllUsers } from "../../services/apis/Admin";
import AllUsersData from "../../components/Admin/AllUsersData";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import CustomTableHeader from "../../components/Admin/CustomTableHeader";
import TableTotalDataCount from "../../components/Admin/TableTotalDataCount";
import Breadcrumbs from "../../components/Breadcrumbs";

const AllUsers = () => {
  const { allUsers, setAllUsers } = useContext(UserContext);
  const [refetch, setRefetch] = useState(false);

  const columns = ["#", "Name", "Email", "Role", "Action"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUsers();
        setAllUsers(usersData.users);
      } catch (error) {
        console.error("Error fetching feature:", error);
      }
    };

    fetchUsers();
  }, [setAllUsers, refetch]);

  return (
    <>
      <CustomHelmet pageName={"All Users"} />
      <div className="p-4 w-full mx-auto">
        <Breadcrumbs
          fromPage={"Dashboard"}
          pageTitle={"Users"}
          fromURL={"/dashboard"}
        />

        <div className="flex justify-center items-center mb-2.5 bg-white py-2 rounded-lg">
          <TableTotalDataCount
            title="Total"
            count={allUsers.length}
            tableName={"users"}
          />
        </div>

        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  <CustomTableHeader columns={columns} />
                  {/* Inside the table body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers.map((user, index) => (
                      <AllUsersData
                        index={index}
                        key={user._id}
                        user={user}
                        setRefetch={setRefetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <a
            href="#"
            className="flex items-center px-5 py-2 text-semibold00 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>previous</span>
          </a>

          <div className="items-center hidden lg:flex gap-x-3">
            {/* ... (rest of the code remains unchanged) */}
          </div>

          <a
            href="#"
            className="flex items-center px-5 py-2 text-semibold00 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <span>Next</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
