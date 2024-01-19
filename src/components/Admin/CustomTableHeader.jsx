const CustomTableHeader = ({
  columns,
  sortColumn,
  sortOrder,
  sortableColumns,
  onSort,
}) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            scope="col"
            className="px-2 py-2.5 font-semibold text-gray-500 cursor-pointer"
            onClick={() =>
              sortableColumns.includes(column.toLowerCase()) &&
              onSort(column.toLowerCase())
            }
          >
            {column}
            {sortableColumns.includes(column.toLowerCase()) && (
              <span className="ml-1">
                {sortColumn === column.toLowerCase() &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </span>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CustomTableHeader;
