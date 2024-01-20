import { useContext } from "react";
import { FeaturesContext } from "../../context/FeaturesContextProvider";
import CustomHelmet from "../../components/CustomComponents/CustomHelmet";
import { SiCodereview } from "react-icons/si";
import { GrInProgress } from "react-icons/gr";
import { MdOutlinePendingActions } from "react-icons/md";
import { AiOutlineFileDone } from "react-icons/ai";
import { RiTodoLine } from "react-icons/ri";

const Dashboard = () => {
  const { statuses } = useContext(FeaturesContext);

  // Define the custom order for statuses
  const customOrder = [
    "pending",
    "under-review",
    "planned",
    "in-progress",
    "complete",
  ];

  // Sort the statuses based on the custom order
  const sortedStatuses = customOrder.map((status) => ({
    status,
    count: statuses[status] || 0,
  }));

  const getStatusIcon = (status) => {
    switch (status) {
      case "under-review":
        return <SiCodereview className="text-2xl md:text-4xl" />;
      case "in-progress":
        return <GrInProgress className="text-2xl md:text-4xl" />;
      case "pending":
        return <MdOutlinePendingActions className="text-2xl md:text-4xl" />;
      case "complete":
        return <AiOutlineFileDone className="text-2xl md:text-4xl" />;
      case "planned":
        return <RiTodoLine className="text-2xl md:text-4xl" />;
      default:
        return null;
    }
  };

  return (
    <>
      <CustomHelmet pageName={"Dashboard"} />
      {/* Main content container */}
      <div className="px-4 pt-10 w-full mx-auto">
        <h3 className="text-3xl my-2 font-bold text-center font-mono">
          Dashboard
        </h3>

        <div className="flex flex-wrap justify-center gap-6 mt-16 font-mono">
          {sortedStatuses.map(({ status, count }) => (
            <div
              key={status}
              className="card w-80 bg-base-100 shadow-xl text-center py-4"
            >
              <div className="card-body">
                <h2 className="card-title flex items-center justify-center text-2xl">
                  {getStatusIcon(status)}
                  <span className="ml-2">
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                  <div className="badge bg-[#B4E4FF] ml-2 px-2 py-3 text-xl">
                    {count}
                  </div>
                </h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
