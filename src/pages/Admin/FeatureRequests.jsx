import { useContext } from "react";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import FeatureRequestsData from "../../components/Admin/FeatureRequestsData";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import CustomTableHeader from "../../components/Admin/CustomTableHeader";
import TableTotalDataCount from "../../components/Admin/TableTotalDataCount";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";

const FeatureRequests = () => {
  const {
    features,
    setRefetch,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
    hasMoreNext,
    hasMorePrev,
    handlePageChange,
    handleItemsPerPageChange,
  } = useContext(FeaturesContext);

  // Table column names
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
      {/* Helmet for setting page metadata */}
      <CustomHelmet pageName={"Feature Requests"} />

      {/* Main content container */}
      <div className="px-4 pt-4 w-full mx-auto">
        {/* Breadcrumbs for navigation */}
        <Breadcrumbs
          fromPage={"Dashboard"}
          pageTitle={"Requests"}
          fromURL={"/dashboard"}
        />

        {/* Total data count and items per page selection */}
        <div className="sm:flex justify-between items-center mb-2.5 bg-white py-2 rounded-lg">
          <div className="relative sm:w-[90%] ml-4">
            <TableTotalDataCount
              title="Total"
              count={totalItems}
              tableName={"Requests"}
            />
          </div>

          <div className="flex items-center w-auto mt-3 sm:mt-0 justify-end">
            <label className="mr-2">Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) =>
                handleItemsPerPageChange(parseInt(e.target.value))
              }
              className="border rounded p-1 mr-2"
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>

        {/* Table for displaying feature requests */}
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <div className="border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-center">
                  {/* Table header */}
                  <CustomTableHeader columns={columns} />

                  {/* Table body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {features.map((feature, index) => (
                      <FeatureRequestsData
                        index={index}
                        key={feature._id}
                        feature={feature}
                        setRefetch={setRefetch}
                      />
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

export default FeatureRequests;
