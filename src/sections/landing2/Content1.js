import React from "react";
import imgC from "../../assets/image/l2/png/content-2-img1.png";
import Link from "next/link";

const Content = () => {
  return (
    <>
      {/* <!-- Content Area -->  */}
      <section className="pt-13 pt-lg-30 pb-13 pb-lg-30">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div
              className="col-lg-6 col-md-8 col-sm-10 col-xs-11 mb-9 mb-lg-0"
              data-aos="fade-right"
              data-aos-duration="800"
            >
              {/* <!-- content-1 left-content start --> */}
              <div className="position-relative pr-lg-20 pr-xs-15 pr-9 ">
                {/* <!-- content img start --> */}
                <img src={imgC} alt="" className="w-100" />
                {/* <!-- content img end --> */}
                {/* <!-- abs-content start --> */}
                <div className="abs-content pos-abs-br bg-white shadow-2 pl-7 pt-8 pb-1 pr-11 max-width-px-311 rounded mb-15 mb-xs-18 mb-lg-15 mb-xl-18">
                  {/* <!-- media start --> */}
                  <div className="media mb-5">
                    {/* <!-- check-mark start --> */}
                    <span className="check-mark bg-yellow-2 circle-41">
                      <i className="fas fa-check text-white  font-size-6"></i>
                    </span>
                    {/* <!-- check-mark end --> */}
                    {/* <!-- media body start --> */}
                    <div className="media-body pl-5">
                      <h6 className="mb-0 font-size-3 text-green text-uppercase">
                        <Link href="/recent"><a>View our recent payments</a></Link>
                      </h6>
                     
                    </div>
                    {/* <!-- media body start --> */}
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- abs-content end --> */}
              </div>
              {/* <!-- content-1 left-content end --> */}
            </div>
            <div
              className="col-xl-5 col-lg-6 col-md-8 col-xs-10"
              data-aos="fade-left"
              data-aos-duration="800"
            >
              {/* <!-- content-1 start --> */}
              <div className="content-1 pl-xl-5 pl-xxl-11 pr-xxl-10">
                {/* <!-- content-1 section-title start --> */}
                <h2 className="font-size-9 mb-md-15 mb-13">
                  Earning writing captions <br className="d-none d-sm-block" />
                  is made just easy
                </h2>
                {/* <!-- content-1 section-title end --> */}
                {/* <!-- media start --> */}
                <div className="media mb-11">
                  {/* <!-- media icon start --> */}
                 
                  {/* <!-- media icon start --> */}
                  {/* <!-- media body start --> */}
                  <div className="media-body pl-7">
                    <h5 className="mb-5 h5">1. Write Captions</h5>
                    <p className="mb-0 font-size-4 text-default-color">
                      Write captions on some of our photos. 
                    </p>
                  </div>
                  {/* <!-- media body start --> */}
                </div>
                {/* <!-- media end --> */}
                {/* <!-- media start --> */}
                <div className="media mb-11">
                  {/* <!-- media icon start --> */}
                  
                  {/* <!-- media icon start --> */}
                  {/* <!-- media body start --> */}
                  <div className="media-body pl-7">
                    <h5 className="mb-5 h5">2. Earn</h5>
                    <p className="mb-0 font-size-4 text-default-color">
                      We pay you after writing some captions.
                    </p>
                  </div>
                  {/* <!-- media body start --> */}
                </div>
                {/* <!-- media end --> */}
                {/* <!-- media start --> */}
                <div className="media">
                  {/* <!-- media icon start --> */}
                  
                  {/* <!-- media icon start --> */}
                  {/* <!-- media body start --> */}
                  <div className="media-body pl-7">
                    <h5 className="mb-5 h5">3. Withdraw</h5>
                    <p className="mb-0 font-size-4 text-default-color">
                      Then, you can withdraw your earned cash to your Bitcoin Address..
                    </p>
                  </div>
                  {/* <!-- media body start --> */}
                </div>
                {/* <!-- media end --> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Content;
