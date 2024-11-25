import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Outlet } from "react-router-dom";

export default function () {
  return (
    <>
      {/* NEED TO TAKE AUTH STATE OUTSIDE */}
      <Header />

      <Outlet />

      <Footer />
    </>
  );
}
