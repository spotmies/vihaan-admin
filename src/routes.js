import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./pages/Login";
// import Register from './pages/Register';
import DashboardApp from "./pages/DashboardApp";
import Products from "./pages/Products";
// import Blog from './pages/Blog';
import User from "./pages/User";
import NotFound from "./pages/Page404";
import Orders from "./pages/Orders";
import Vehicleb from "./pages/Vehicle-booking";
import Feedback from "./pages/Feedback&review";
import NewProduct from "./pages/NewProduct";
import { useStores } from "./state_management/store";
import TestRides from "./pages/testRide";
import { useEffect, useState } from "react";
import firebase from "./firebase";
// ----------------------------------------------------------------------

export default function Router() {
  const { CommonStore } = useStores();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("user login", user);
        CommonStore.login();
        setIsLogin(true);
        // navigate("/dashboard", { replace: true });
      } else {
        console.log("no user");
        CommonStore.logout();
        setIsLogin(false);
      }
    });
  }, []);

  return useRoutes([
    {
      path: "/dashboard",
      element:
        CommonStore.isUserAuthenticated || isLogin ? (
          <DashboardLayout />
        ) : (
          <Navigate to="/login" />
        ),
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <DashboardApp /> },
        { path: "user", element: <User /> },
        { path: "products", element: <Products /> },
        { path: "orders", element: <Orders /> },
        { path: "vehicle-booking", element: <Vehicleb /> },
        { path: "feedback-review", element: <Feedback /> },
        { path: "new-product", element: <NewProduct /> },
        { path: "test-ride-booking", element: <TestRides /> },
        // { path: 'blog', element: <Blog /> }
      ],
    },
    {
      path: "/",
      element:
        !CommonStore.isUserAuthenticated || !isLogin ? (
          <LogoOnlyLayout />
        ) : (
          <Navigate to="/dashboard" />
        ),
      children: [
        { path: "login", element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
