import React from "react";
import PageWrapper from "../components/PageWrapper";
import Link from "next/link";

const About = () => {

  

  return (
    <>
      <PageWrapper
      headerConfig={{
        title: "About Us | BudEarn"
      }}>
        <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <h2 className="font-size-9 text-center mb-11">About Budearn.com</h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">

                <p>Budearn.com is a rewards program that gives you real money for the everyday things you already do online. Earn cash when you write captions on photos, share on Facebook, search the web, answer surveys. Cash is paid out through Bitcoin. Join for free today.</p>

                <p>For more information please visit <Link href="/"><a>http://www.budearn.com.</a></Link></p>

                 </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};

export default About;
