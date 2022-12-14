import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import "./index.css";
// Import pages
import App from "./App";
import ErrorPage from "./pages/error.page";
import Home, { loader as homeLoader } from "./pages/home.page";
import About from "./pages/about.page";
import Details, { loader as detailsLoader } from "./pages/details.page";
import Cart from "./pages/cart.page";
import Login from "./pages/login.page";
import DashboardPage from "./pages/dashboard.page";
import OrdersPage from "./pages/orders.page";
// Import utils
import store from "./storage/store";
import Register from "./pages/register.page";
// Import guards
import AuthGuard from "./guards/auth.guard";
import RootGuard from "./guards/root.guard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <div>Something goes wrong.</div>,
        children: [
          {
            index: true,
            loader: homeLoader,
            element: <Home />,
          },
          {
            path: "/home",
            loader: homeLoader,
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
          {
            path: "details/:id",
            loader: detailsLoader,
            element: <Details />,
          },
          {
            path: "/cart",
            element: <Cart />,
          },
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/register",
            element: <Register />,
          },
          {
            path: "/dashboard",
            element: (
              <RootGuard component=<DashboardPage /> authorised={["Admin"]} />
            ),
          },
          {
            path: "/orders",
            element: (
              <RootGuard
                component=<OrdersPage />
                authorised={["User", "Admin"]}
              />
            ),
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  //</React.StrictMode>
);
