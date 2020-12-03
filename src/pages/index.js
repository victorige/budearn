import React from "react";
import PageWrapper from "../components/PageWrapper";
import Hero from "../sections/landing1/Hero";
import Brands from "../sections/landing1/Brands";
import Categories from "../sections/landing1/Categories";
import Content1 from "../sections/landing2/Content1";
import FeaturedJobs from "../sections/landing1/FeaturedJobs";
import Content2 from "../sections/landing2/Content2";
import Unprotected from "../utils/unprotected"

const IndexPage = () => {
  return (
    <>
      <PageWrapper
        headerConfig={{
          bgClass: "dynamic-sticky-bg",
          title: "BudEarn"
        }}
      >
        <Hero />
        <Content1 />
        
        <Content2 />
      </PageWrapper>
    </>
  );
};
export default Unprotected(IndexPage);
