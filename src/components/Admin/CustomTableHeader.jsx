const CustomTableHeader = ({ columns }) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {columns.map((column, index) => (
          <th
            key={index}
            scope="col"
            className="px-2 py-2.5 font-semibold text-gray-500"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default CustomTableHeader;
