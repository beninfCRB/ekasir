import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/result/boundary";
import NotFound from "./components/result/notfound";
import Signin from "./pages/auth/signin";
import AddProduct from "./pages/products/add";
import Product from "./pages/products/product";
import EditProduct from "./pages/products/edit";
import Home from "./pages/home";
import MainLayout from "./components/mainlayout";
import ViewProduct from "./pages/products/view";
import SignUp from "./pages/auth/signup";

const router = createBrowserRouter([
  {
    path: '/',
    element: <ErrorBoundary><Home /></ErrorBoundary>,
  },
  {
    path: "admin",
    element: <ErrorBoundary><MainLayout /></ErrorBoundary>,
    children: [
      {
        path: "product",
        element: <ErrorBoundary><Product /></ErrorBoundary>,
      },
      {
        path: "product/add",
        element: <ErrorBoundary><AddProduct /></ErrorBoundary>,
      },
      {
        path: "product/edit/:id",
        element: <ErrorBoundary><EditProduct /></ErrorBoundary>,
      },
      {
        path: "product/view/:id",
        element: <ErrorBoundary><ViewProduct /></ErrorBoundary>,
      },
    ],
  },
  {
    path: "signin",
    element: <ErrorBoundary><Signin /></ErrorBoundary>,
  },
  {
    path: "signup",
    element: <ErrorBoundary><SignUp /></ErrorBoundary>,
  },
  {
    path: '*',
    element: <ErrorBoundary><NotFound /></ErrorBoundary>,
  }
]);

export default router
