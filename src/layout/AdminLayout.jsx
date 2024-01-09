import { Outlet } from "react-router-dom";
import Sidebar from "../components/Admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="max-w-screen-2xl mx-auto bg-[#B4E4FF] flex">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
