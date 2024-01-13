import { useContext } from "react";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import FeatureRequestsData from "../../components/Admin/FeatureRequestsData";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";

const FeatureRequests = () => {
  const { features } = useContext(FeaturesContext);

  return (
    <>
      <CustomHelmet pageName={"Feature Requests"} />
      <div className="p-4 w-full mx-auto">
        <div className="flex items-center gap-x-3 justify-center bg-white py-4 rounded-t-lg">
          <h2 className="text-2xl text-gray-800 font-mono font-semibold">
            Total
            <span className="p-2 mx-2 text-lg text-blue-600 bg-blue-100 rounded-full">
              {features.length}
            </span>
            Requests
          </h2>
        </div>

        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden border border-gray-200 md:rounded-b-lg">
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
                        Title
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold text-gray-500"
                      >
                        Description
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold text-gray-500"
                      >
                        Request By
                      </th>

                      <th
                        scope="col"
                        className="px-4 py-3.5 font-semibold text-gray-500"
                      >
                        Status
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
