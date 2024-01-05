import { CustomDateFormat } from "../../utils/CustomDateFormat";

const FeatureRequestItem = ({ feature }) => {
  console.log(feature);
  const { createdAt, createdBy, description, likes, status, title } = feature;
  return (
    <div className="px-4 py-2 bg-white rounded-lg drop-shadow-md mb-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-light text-gray-600">
          {CustomDateFormat(createdAt)}
        </span>
        <a
          className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500 capitalize"
          tabIndex="0"
          role="button"
        >
          {status}
        </a>
      </div>

      <div className="mt-1">
        <a
          href="#"
          className="text-xl font-bold text-gray-700 hover:text-gray-600 hover:underline"
          tabIndex="0"
          role="link"
        >
          {title}
        </a>
        <p className="mt-1 text-gray-600">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-2">
        <a
          href="#"
          className="text-blue-600 hover:underline"
          tabIndex="0"
          role="link"
        >
          {likes.count}
        </a>

        <div className="flex items-center">
          <img
            className="hidden object-cover w-6 h-6 mx-2 rounded-full sm:block"
            src={feature.authorAvatar}
            alt="avatar"
          />
          <a
            className="text-gray-700 cursor-pointer text-sm"
            tabIndex="0"
            role="link"
          >
            {createdBy.name}
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeatureRequestItem;
