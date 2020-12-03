import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import GlobalContext from "../../context/GlobalContext";
import Logo from "../Logo";
import imgM from "../../assets/image/l1/png/message.png";
import jsCookie from 'js-cookie';
import Analytics from 'analytics';
import googleAnalytics from '@analytics/google-analytics';

const Footer = () => {
  const gContext = useContext(GlobalContext);
  const analytics = Analytics({
    app: 'BudEarn',
    plugins: [
      googleAnalytics({
        trackingId: 'UA-146197989-2'
      })
    ]
  })
 
  useEffect(() => {
    analytics.page()
}, [])

  return (
    <>
      <footer className="footer bg-ebony-clay dark-mode-texts">
       
      
        <div className="container">
          {/* <!-- Cta section --> */}
          {jsCookie.get("token") == undefined && <div className="pt-11 pt-lg-20 pb-13 pb-lg-20 border-bottom border-width-1 border-default-color-2">
            <div className="row justify-content-center ">
              <div
                className="col-xl-7 col-lg-12"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                {/* <!-- cta-content start --> */}
                <div className="pb-xl-0 pb-9 text-xl-left text-center">
                  <h2 className="text-white font-size-8 mb-4">
                    Most comprehensive captioning website
                  </h2>
                </div>
                {/* <!-- cta-content end --> */}
              </div>
              <div
                className="col-xl-5 col-lg-12"
                data-aos="fade-left"
                data-aos-duration="1000"
              >
                {/* <!-- cta-btns start --> */}
                <div className="btns d-flex justify-content-xl-end justify-content-center align-items-xl-center flex-wrap h-100  mx-n4">
                  <Link href="/login">
                  <a
                    className="btn btn-outline-gallery btn-xl mx-4 mt-6 text-uppercase"
                    
                    
                  >
                    Log in
                  </a>
                  </Link>
                  <Link href="/register">
                  <a
                    className="btn btn-green btn-h-60 btn-xl mx-4 mt-6 text-uppercase"
                    
                    
                  >
                    Register
                  </a>
                  </Link>
                </div>
                {/* <!-- cta-btns end --> */}
              </div>
            </div>
          </div>}
        </div>
      
       
        <div className="container  pt-12 pt-lg-19 pb-10 pb-lg-19">
          <div className="row">
            <div className="col-lg-4 col-sm-6 mb-lg-0 mb-9">
              {/* <!-- footer logo start --> */}
              <Logo white className="footer-logo mb-14" />
              {/* <!-- footer logo End --> */}

              {/* <!-- media start --> */}
              <div className="media mb-11">
                <img src={imgM} className="align-self-center mr-3" alt="" />
                <div className="media-body pl-5">
                  <p className="mb-0 font-size-4 text-white">Contact us at</p>
                  <Link href="/contact">
                    <a className="mb-0 font-size-4 font-weight-bold">
                      Contact Form
                    </a>
                  </Link>
                </div>
              </div>
              {/* <!-- media start --> */}

            </div>
            <div className="col-lg-8 col-md-6">
              <div className="row">

                <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">

                 <div className="footer-widget widget2 mb-md-0 mb-13">
                    {/* <!-- footer widget title start --> */}
                    <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                      Company
                    </p>
                    {/* <!-- footer widget title end --> */}
                    {/* <!-- widget social menu start --> */}
                    <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                      <li className="mb-6">
                        <Link href="/about">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            About us
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/contact">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Contact us
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/recent">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Recent Payments
                          </a>
                        </Link>
                      </li>
                      
                    </ul>
                    {/* <!-- widget social menu end --> */}
                  </div>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                <div className="footer-widget widget3 mb-sm-0 mb-13">
                    {/* <!-- footer widget title start --> */}
                    <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                      Legal
                    </p>
                    {/* <!-- footer widget title end --> */}
                    <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                      <li className="mb-6">
                        <Link href="/privacy">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Privacy Policy
                          </a>
                        </Link>
                      </li>
                      <li className="mb-6">
                        <Link href="/terms">
                          <a className="heading-default-color font-size-4 font-weight-normal">
                            Terms &amp; Conditions
                          </a>
                        </Link>
                      </li>
                      
                    </ul>
                  </div></div>
                
              </div>
            </div>
          </div>
        </div>
        <div className="container"><div className="pt-11 pt-lg-20 pb-5 pb-lg-5 border-bottom border-width-1 border-default-color-2"><div className="row justify-content-center ">
        <div
                className="col-xl-7 col-lg-12"
              ><div className="pb-xl-0 text-center">
              <div className="text-white font-size-3 mb-4">
          Copyright &copy; 2020 EarnBud<br/>
      All rights reserved. Other trademarks appearing on this site are property of their respective owners, which do not endorse and are not affiliated with EarnBud or its promotions.
      </div></div></div></div></div></div>
      </footer>
    </>
  );
};

export default Footer;
