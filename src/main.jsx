import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Home from "./assets/Components/Home";
import Info from "./assets/Components/Info";

const router = createBrowserRouter([

  {
    path: "/API_COUNTRIES",
    element: <Home />
  },
  {
    path: "/info/:id",
    element: <Info />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(

  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);