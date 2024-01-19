import { MdDone } from "react-icons/md";
import { FaQuestion } from "react-icons/fa6";

const SortingButtons = ({ sortBy, sortOrder, handleSort }) => {
  // An array of sorting options
  const sortingOptions = [
    { field: "createdAt", order: "desc", label: "Newest" },
    { field: "createdAt", order: "asc", label: "Oldest" },
    { field: "title", order: "asc", label: "A-Z" },
    { field: "title", order: "desc", label: "Z-A" },
    { field: "likes", order: "desc", label: "Likes (High to Low)" },
    { field: "likes", order: "asc", label: "Likes (Low to High)" },
    { field: "comments", order: "desc", label: "Comments (High to Low)" },
    { field: "comments", order: "asc", label: "Comments (Low to High)" },
  ];

  return (
    <>
      {/* Regular Buttons (hidden on small screens) */}
      <div className="flex flex-wrap sm:flex-col">
        <div className="hidden sm:flex flex-wrap">
          {sortingOptions.map((option) => (
            <button
              key={option.label}
              onClick={() => handleSort(option.field, option.order)}
              className={`flex flex-col justify-center items-center min-w-24 lg:min-w-full max-w-64 lg:max-w-full gap-2 p-2 bg-slate-100 rounded mr-2 mt-2 hover:bg-green-300 text-gray-600 font-semibold ${
                sortBy === option.field && sortOrder === option.order
                  ? "bg-green-200 text-[#332532]"
                  : ""
              }`}
            >
              <div className="flex items-center">
                <span>{option.label}</span>
                {sortBy === option.field && sortOrder === option.order ? (
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
          onChange={(e) => {
            const [field, order] = e.target.value.split("-");
            handleSort(field, order);
          }}
        >
          {sortingOptions.map((option) => (
            <option
              key={option.label}
              value={`${option.field}-${option.order}`}
            >
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

export default SortingButtons;
