import { createBrowserRouter } from "react-router-dom";
import { LoginPage, PageNotFoundPage, SessionPage } from "./pages";
import { ProtectedRoute } from "./utils";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/session",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <SessionPage />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFoundPage />,
  },
]);
