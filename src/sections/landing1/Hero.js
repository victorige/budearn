import React from "react";

import Link from "next/link";
import imgH from "../../assets/image/l1/png/hero-image-man.png";
import imgP from "../../assets/image/patterns/hero-pattern.png";



const Hero = () => {
  return (
    <>
      {/* <!-- Hero Area --> */}
      <div className="bg-gradient-1 pt-26 pt-md-32 pt-lg-33 pt-xl-35 position-relative z-index-1 overflow-hidden">
        {/* <!-- .Hero pattern --> */}
        <div className="pos-abs-tr w-50 z-index-n2">
          <img src={imgP} alt="" className="gr-opacity-1" />
        </div>
        {/* <!-- ./Hero pattern --> */}
        <div className="container">
          <div className="row position-relative align-items-center">
            <div
              className="col-xxl-6 col-xl-7 col-lg-8 col-md-12 pt-lg-13 pb-lg-33 pb-xl-34 pb-md-33 pb-10"
              data-aos="fade-right"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className="text-primary font-size-5 font-weight-semibold mb-7">
                  #over $150,000 paid out daily
                  </div>
              <h1 className="font-size-11 mb-12 pr-md-30 pr-lg-0">
                Get paid for writing captions on photos.
              </h1>
              <div className="">
                
              <Link href="/login">
                <a
                  className="btn btn-white text-uppercase font-size-3 mr-5"
                  
                  
                >
                  Log In
                </a>
                </Link>

                <Link href="/register">
                <a
                  className={`btn btn-green text-uppercase font-size-3 ml-5`}
                  
                  
                >
                  Sign Up
                </a></Link>



                
              </div>
            </div>
            {/* <!-- Hero Right Image --> */}
            <div
              className="col-lg-6 col-md-4 col-sm-6 col-xs-6 col-8 pos-abs-br z-index-n1 position-static position-md-absolute mx-auto ml-md-auto"
              data-aos="fade-left"
              data-aos-duration="1000"
              data-aos-delay="500"
            >
              <div className=" ml-xxl-23 ml-xl-12 ml-md-7">
                <img src={imgH} alt="" className="w-100" />
              </div>
            </div>
            {/* <!-- ./Hero Right Image --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
