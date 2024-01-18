import { FaQuestion } from "react-icons/fa6";
import { MdDone } from "react-icons/md";

const SortingButtons = ({ sortBy, sortOrder, handleSort }) => {
  // An array of sorting options
  const sortingOptions = [
    { field: "createdAt", order: "desc", label: "Newest" },
    { field: "createdAt", order: "asc", label: "Oldest" },
    { field: "likes", order: "desc", label: "Likes (High to Low)" },
    { field: "likes", order: "asc", label: "Likes (Low to High)" },
    { field: "comments", order: "desc", label: "Comments (High to Low)" },
    { field: "comments", order: "asc", label: "Comments (Low to High)" },
    { field: "title", order: "asc", label: "A-Z" },
    { field: "title", order: "desc", label: "Z-A" },
  ];

  return (
    <div className="flex flex-wrap">
      {sortingOptions.map((option) => (
        <button
          key={option.label}
          className={`flex flex-col justify-center items-center gap-2 p-2 bg-slate-100 rounded mr-2 mt-2 lg:w-full hover:bg-slate-200 text-gray-600 font-semibold ${
            sortBy === option.field && sortOrder === option.order
              ? "bg-green-200/50 hover:bg-green-200"
              : ""
          }`}
          onClick={() => handleSort(option.field, option.order)}
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
  );
};

export default SortingButtons;
