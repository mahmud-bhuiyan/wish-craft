import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthContextProvider from "./context/AuthContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <HelmetProvider>
        <ToastContainer autoClose={3000} rtl={false} theme="dark" />
        <RouterProvider router={router} />
      </HelmetProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
