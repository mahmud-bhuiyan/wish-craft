import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { WebsiteContext } from "../context/WebsiteContextProvider";

const HeroSection = () => {
  // current location using useLocation hook
  const location = useLocation();

  // Check if the current page is a profile page
  const isProfilePage = location.pathname.includes("create");

  // Get websiteInfo from WebsiteContext using useContext hook
  const { websiteInfo } = useContext(WebsiteContext);

  // Determine whether to display the HeroSection based on boardStatus
  const display = websiteInfo?.boardStatus;

  return (
    <>
      <div className="mt-8 pt-6 bg-[#332532] shadow text-white">
        <div className="max-w-screen-xl mx-auto px-2 pt-8 pb-2">
          {/* Display the HeroSection content only if boardStatus is "Active" */}
          {display !== "Active" ? null : (
            <div className="mb-4">
              {/* Title and description for Feature Request Board */}
              <h3 className="text-3xl font-semibold mb-2">
                {websiteInfo?.title}
              </h3>
              <h5 className="text-gray-100">{websiteInfo?.description}</h5>
            </div>
          )}

          {/* Navigation links for Feature Requests and Create Request */}
          <div className="pt-4 flex gap-4">
            {/* Link to Feature Requests page */}
            <Link
              to="/"
              style={{
                borderBottom: `2px solid ${
                  isProfilePage ? "#ffffff" : "transparent"
                }`,
                backgroundImage: isProfilePage
                  ? "none"
                  : "linear-gradient(to right, #ff8a00, #e52e71)",
                backgroundSize: "100% 2px",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat",
                transition: "background-size 0.3s",
              }}
            >
              Feature Requests
            </Link>

            {/* Link to Create Request page */}
            <Link
              to="/feature-requests/create"
              style={{
                borderBottom: `2px solid ${
                  isProfilePage ? "transparent" : "#ffffff"
                }`,
                backgroundImage: isProfilePage
                  ? "linear-gradient(to right, #ff8a00, #e52e71)"
                  : "none",
                backgroundSize: "100% 2px",
                backgroundPosition: "0 100%",
                backgroundRepeat: "no-repeat",
                transition: "background-size 0.3s",
              }}
            >
              Create Request
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// Export the HeroSection component as the default export
export default HeroSection;
