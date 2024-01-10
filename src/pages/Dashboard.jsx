import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContextProvider";
import { getAllUsers } from "../services/apis/Admin";
import AllUsersData from "../components/Admin/AllUsersData";

const Dashboard = () => {
  const { allUsers, setAllUsers } = useContext(UserContext);
  const [refetch, setRefetch] = useState(false);
  
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

  console.log(allUsers);

  return (
    <div className="max-w-screen-xl p-4 my-4 w-full mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ml-1">Total</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {allUsers.length} users
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-center">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-semibold text-gray-500"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 font-semibold text-gray-500"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-semibold text-gray-500"
                    >
                      Email
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-semibold text-gray-500"
                    >
                      Role
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 font-semibold text-gray-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
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
  );
};

export default Dashboard;
