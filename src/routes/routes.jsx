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
        path: "/feature-requests/create",
        element: <Home />,
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
]);
