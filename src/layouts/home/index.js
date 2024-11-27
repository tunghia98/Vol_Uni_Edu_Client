/* eslint-disable react/prop-types */
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import { Outlet } from "react-router-dom";

export default function HomeLayout({ auth }) {
  return (
    <>
      <Header auth={auth} />

      <Outlet />

      <Footer />
    </>
  );
}
