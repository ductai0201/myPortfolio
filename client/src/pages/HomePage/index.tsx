import React from "react";
import Header from "@/components/Header/Header";
import { About } from "..";
import Blog from "../BlogPage";
import Portfolio from "../Portfolio";
import CustomerReviews from "../CustomerReviews";
import Footer from "@/components/Footer/Footer";

const HomePage = () => {
  return (
    <>
      <Header />
      <About />
      <Blog />
      <Portfolio />
      <CustomerReviews />
      <Footer/>
    </>
  );
};

export default HomePage;
