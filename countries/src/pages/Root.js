import { Outlet } from "react-router-dom";

import Header from "../Component/Header/Header";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
