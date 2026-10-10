import Login from "@monorepo-setup/client/features/auth/page/login/Login";
import SignUp from "@monorepo-setup/client/features/auth/page/signup/SignUp";
import { Navigate } from "react-router-dom";

export const AuthRoutes = [
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
];
