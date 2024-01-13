import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { WebsiteContext } from "../../context/WebsiteContextProvider";

const CustomHelmet = ({ pageName }) => {
  const { websiteInfo } = useContext(WebsiteContext);

  return (
    <Helmet>
      <title>
        {pageName ? pageName + " |" : ""} {websiteInfo.name}
      </title>
    </Helmet>
  );
};

export default CustomHelmet;
