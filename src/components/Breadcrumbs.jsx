import { Link } from "react-router-dom";

const Breadcrumbs = ({ pageTitle, fromPage, fromURL }) => {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between align-middle">
      <h2 className="text-xl md:text-2xl font-bold text-black dark:text-white">
        {pageTitle}
      </h2>
      <nav>
        {fromPage && (
          <span className="font-medium">
            <Link to={fromURL} className="font-medium">
              <span className="text-gray-600 hover:text-black">{fromPage}</span>{" "}
              /{" "}
            </Link>
            <span className="text-blue-500">{pageTitle}</span>
          </span>
        )}
      </nav>
    </div>
  );
};

export default Breadcrumbs;
