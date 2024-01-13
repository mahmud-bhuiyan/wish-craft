import { useContext } from "react";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import FeatureRequestsData from "../../components/Admin/FeatureRequestsData";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import CustomTableHeader from "../../components/Admin/CustomTableHeader";
import TableTotalDataCount from "../../components/Admin/TableTotalDataCount";

const FeatureRequests = () => {
  const { features } = useContext(FeaturesContext);

  const columns = [
    "#",
    "Title",
    "Description",
    "Request By",
    "Status",
    "Action",
  ];

  return (
    <>
      <CustomHelmet pageName={"Feature Requests"} />
      <div className="p-4 w-full mx-auto">
        <TableTotalDataCount
          title="Total"
          count={features.length}
          tableName={"Requests"}
        />

        <div className="flex flex-col mt-4">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  <CustomTableHeader columns={columns} />
                  {/* Inside the table body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {features.map((feature, index) => (
                      <FeatureRequestsData
                        index={index}
                        key={feature._id}
                        feature={feature}
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

export default FeatureRequests;
