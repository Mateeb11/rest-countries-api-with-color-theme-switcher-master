import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "react-material-symbols/dist/rounded.css";

import Header from "./Component/Header/Header";
import Content from "./Component/Content/Content";
import RootLayout from "./pages/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Content /> },
      { path: "coutries/:countryId" },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
