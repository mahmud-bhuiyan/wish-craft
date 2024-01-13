import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import AuthLayout from "../layout/AuthLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import UserProfilePage from "../pages/UserProfilePage";
import CreateFeatureRequest from "../components/Feature/CreateFeatureRequest";
import SingleFeaturePage from "../components/Feature/SingleFeaturePage";
import AdminLayout from "../layout/AdminLayout";
import AdminRoutes from "./AdminRoutes";
import FeatureRequests from "../pages/Admin/FeatureRequests";
import AllUsers from "../pages/Admin/AllUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/feature-requests/:id",
        element: <SingleFeaturePage />,
      },
      {
        path: "/feature-requests/create",
        element: (
          <PrivateRoute>
            <CreateFeatureRequest />
          </PrivateRoute>
        ),
      },

      {
        path: "/users/profile",
        element: (
          <PrivateRoute>
            <UserProfilePage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <AdminRoutes>
        <AdminLayout />
      </AdminRoutes>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "feature-requests",
        element: <FeatureRequests />,
      },
      {
        path: "users",
        element: <AllUsers />,
      },
    ],
  },
]);
