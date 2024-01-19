import { useContext } from "react";
import { WebsiteContext } from "../../../context/WebsiteContextProvider";
import WebsiteLogoUpload from "./WebsiteLogoUpload";

const DisplayWebsiteDetails = () => {
  const { websiteInfo } = useContext(WebsiteContext);

  const { name, title, description, logoUrl } = websiteInfo;

  return (
    <div className="lg:w-5/12 my-4 lg:m-0 bg-white shadow-lg rounded ">
      <h2 className="p-2 font-bold text-2xl ml-5 font-mono text-center">
        Website Info&apos;s
      </h2>
      <hr />
      <div className="px-6 pb-6 pt-4">
        <div className="flex flex-col items-center -mx-2">
          <img
            className="object-cover w-24 h-24 mx-2 rounded-full"
            src={logoUrl}
            alt="logo"
          />
          <h4 className="mx-2 mt-4 font-medium text-gray-800 text-2xl">
            {name}
          </h4>
          <p className="mx-2 mt-4 text-lg font-medium text-gray-600">{title}</p>
          <p className="mx-2 my-4 text-sm font-medium text-gray-600 text-center">
            {description}
          </p>

          {/* website logo upload  */}
          <WebsiteLogoUpload />
        </div>
      </div>
    </div>
  );
};

export default DisplayWebsiteDetails;
