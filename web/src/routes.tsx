import { createBrowserRouter } from "react-router";
import ErrorBoundary from "./components/result/boundary";
import NotFound from "./components/result/notfound";
import Signin from "./pages/auth/signin";
import AddProduct from "./pages/products/add";
import Product from "./pages/products";
import EditProduct from "./pages/products/edit";
import Home from "./pages/home";
import MainLayout from "./components/mainlayout";
import ViewProduct from "./pages/products/view";
import SignUp from "./pages/auth/signup";
import Category from "./pages/category";
import AddCategory from "./pages/category/add";
import EditCategory from "./pages/category/edit";
import ViewCategory from "./pages/category/view";
import ViewStock from "./pages/stock/view";
import Stock from "./pages/stock";
import AddStock from "./pages/stock/add";
import EditStock from "./pages/stock/edit";
import Tax from "./pages/tax";
import AddTax from "./pages/tax/add";
import EditTax from "./pages/tax/edit";
import ViewTax from "./pages/tax/view";
import Selling from "./pages/selling";
import EditSelling from "./pages/selling/edit";
import ViewSelling from "./pages/selling/view";

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
      {
        path: "category",
        element: <ErrorBoundary><Category /></ErrorBoundary>,
      },
      {
        path: "category/add",
        element: <ErrorBoundary><AddCategory /></ErrorBoundary>,
      },
      {
        path: "category/edit/:id",
        element: <ErrorBoundary><EditCategory /></ErrorBoundary>,
      },
      {
        path: "category/view/:id",
        element: <ErrorBoundary><ViewCategory /></ErrorBoundary>,
      },
      {
        path: "stock",
        element: <ErrorBoundary><Stock /></ErrorBoundary>,
      },
      {
        path: "stock/add",
        element: <ErrorBoundary><AddStock /></ErrorBoundary>,
      },
      {
        path: "stock/edit/:id",
        element: <ErrorBoundary><EditStock /></ErrorBoundary>,
      },
      {
        path: "stock/view/:id",
        element: <ErrorBoundary><ViewStock /></ErrorBoundary>,
      },
      {
        path: "tax",
        element: <ErrorBoundary><Tax /></ErrorBoundary>,
      },
      {
        path: "tax/add",
        element: <ErrorBoundary><AddTax /></ErrorBoundary>,
      },
      {
        path: "tax/edit/:id",
        element: <ErrorBoundary><EditTax /></ErrorBoundary>,
      },
      {
        path: "tax/view/:id",
        element: <ErrorBoundary><ViewTax /></ErrorBoundary>,
      },
      {
        path: "selling",
        element: <ErrorBoundary><Selling /></ErrorBoundary>,
      },
      {
        path: "selling/edit/:id",
        element: <ErrorBoundary><EditSelling /></ErrorBoundary>,
      },
      {
        path: "selling/view/:id",
        element: <ErrorBoundary><ViewSelling /></ErrorBoundary>,
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
