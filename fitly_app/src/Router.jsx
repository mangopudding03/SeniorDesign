import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Dashboard from "./components/Dashboard";
import PrivateRoute from "./components/PrivateRoute";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  {path: "/SignUp",element: <SignUp /> },
  {path: "/SignIn",element: <SignIn /> },
  {path: "/Dashboard",element: <PrivateRoute> <Dashboard /> </PrivateRoute> },

]);
