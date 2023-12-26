import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div>
      <div className="container p-2 mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
