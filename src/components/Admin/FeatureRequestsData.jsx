const FeatureRequestsData = ({ feature, index }) => {
  const { _id, title, description, createdBy, status } = feature;

  return (
    <tr key={_id}>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {index + 1}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">{title}</td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {description}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800">
        {createdBy?.name}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800 uppercase">
        {status}
      </td>
      <td className="py-2 px-4 text-sm font-normal text-gray-800 flex justify-center align-middle gap-4"></td>
    </tr>
  );
};

export default FeatureRequestsData;
