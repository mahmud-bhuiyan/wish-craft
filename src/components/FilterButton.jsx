import { MdDone } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";

const FilterButton = ({ handleFilter, selectedStatus }) => {
  const filteringOptions = [
    { field: "", label: "All Status" },
    { field: "pending", label: "Pending" },
    { field: "under-review", label: "Under Review" },
    { field: "planned", label: "Planned" },
    { field: "in-progress", label: "In Progress" },
    { field: "complete", label: "Complete" },
  ];

  return (
    <>
      {/* Regular Buttons (hidden on small screens) */}
      <div className="flex flex-wrap sm:flex-col">
        <div className="hidden sm:flex flex-wrap">
          {filteringOptions.map((option) => (
            <button
              key={option.field}
              onClick={() => handleFilter(option.field)}
              className={`flex flex-col justify-center items-center gap-4 w-36 lg:w-40 p-2 bg-slate-100 rounded mr-2 mt-2 hover:bg-green-300 text-gray-600 font-semibold ${
                selectedStatus === option.field
                  ? "bg-green-200 text-[#332532]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <span>{option.label}</span>
                {selectedStatus === option.field ? (
                  <MdDone className="text-xl ml-2 mt-1 bg-green-300 rounded text-[#332532]" />
                ) : (
                  <FaQuestion className="text-xl ml-2 p-1 bg-green-300 rounded text-[#332532]" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown (visible on small screens) */}
      <div className="sm:hidden relative mt-2">
        <select
          className="block appearance-none w-full bg-slate-100 border border-gray-300 text-gray-600 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          onChange={(e) => handleFilter(e.target.value)}
        >
          {filteringOptions.map((option) => (
            <option key={option.field} value={option.field}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-600">
          <MdDone className="text-xl p-1 bg-green-300 rounded text-[#332532]" />
        </div>
      </div>
    </>
  );
};

export default FilterButton;
