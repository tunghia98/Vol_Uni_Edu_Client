import Header from "../components/Header";
import Footer from "../components/Footer";

import HomePage from "./Homepage";

export default function () {
  return (
    <>
      {/* NEED TO TAKE AUTH STATE OUTSIDE */}
      <Header />

      <HomePage />

      <Footer />
    </>
  );
}
