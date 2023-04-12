import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import "react-material-symbols/dist/rounded.css";

import Content from "./pages/Content";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import CountriesDetailsPage from "./pages/CountriesDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,

    children: [
      { index: true, element: <Content /> },
      { path: ":countryId", element: <CountriesDetailsPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
