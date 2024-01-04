import { Link, useLocation } from "react-router-dom";

const HeroSection = () => {
  const location = useLocation();
  const isProfilePage = location.pathname.includes("create");

  return (
    <>
      <div className="mt-10 pt-6 bg-[#332532] shadow text-white">
        <div className="max-w-screen-xl mx-auto px-2 pt-8 pb-2">
          <div className="mb-4">
            <h3 className="text-3xl font-semibold mb-2">
              Feature Request Board
            </h3>
            <h5 className="text-gray-100">
              WishNest is a canvas for your dreams. What features would make it
              perfect for you? Share your thoughts with us.
            </h5>
          </div>

          <div className="pt-4 flex gap-4">
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

export default HeroSection;
