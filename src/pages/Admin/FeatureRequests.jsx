import { useContext, useState } from "react";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import FeatureRequestsData from "../../components/Admin/FeatureRequestsData";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import TableTotalDataCount from "../../components/Admin/TableTotalDataCount";
import Breadcrumbs from "../../components/Breadcrumbs";
import Pagination from "../../components/Pagination";
import CustomTableHeader from "../../components/Admin/CustomTableHeader";

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

  const [sortColumn, setSortColumn] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // Table column names
  const columns = [
    "#",
    "Created At",
    "Title",
    "Description",
    "Request By",
    "Status",
    "Action",
  ];

  // Handle column header click event for sorting
  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const sortedFeatures = () => {
    return features.slice().sort((a, b) => {
      if (sortColumn === "createdAt") {
        const valueA = a[sortColumn];
        const valueB = b[sortColumn];

        if (typeof valueA === "string") {
          // Case-insensitive string comparison
          return valueA.localeCompare(valueB, undefined, {
            sensitivity: "base",
          });
        } else if (valueA instanceof Date) {
          // Date comparison using timestamps
          return new Date(valueA).getTime() - new Date(valueB).getTime();
        } else {
          // Default sorting for other data types
          return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
        }
      }
    });
  };

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
                  {/* Using the CustomTableHeader component */}
                  <CustomTableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    sortableColumns={["title", "description", "status"]}
                    onSort={handleSort}
                  />
                  {/* Table body */}
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedFeatures().map((feature, index) => (
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
