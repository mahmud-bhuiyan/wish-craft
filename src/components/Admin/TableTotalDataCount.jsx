const TableTotalDataCount = ({ title, count, tableName }) => {
  return (
    <div className="flex items-center gap-x-3 justify-center">
      <h2 className="text-2xl text-gray-800 font-mono font-semibold uppercase">
        {title}
        <span className="px-2.5 py-1 mx-2 text-lg text-blue-600 bg-blue-100 rounded-full">
          {count}
        </span>
        {tableName}
      </h2>
    </div>
  );
};

export default TableTotalDataCount;
