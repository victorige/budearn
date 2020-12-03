import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import GlobalContext from "../context/GlobalContext";
import imgP from "../assets/image/patterns/hero-pattern.png";
import { useRouter } from 'next/router'
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import ContentLoader from "react-content-loader";

import axios from "axios";
import { noty } from "../utils/noty";

import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')



var jwt = require('jsonwebtoken');




const Recent = () => {
    
  const router = useRouter()
    const [showPass, setShowPass] = useState(true);
    const gContext = useContext(GlobalContext);

    const [loading, setloading] = useState(false)
    const [recall, setrecall] = useState(0)

    const [payments, setpayments] = useState([])

    useEffect(() => {
        queryhistory()
    }, [])

    useEffect(() => {
        const timer=setTimeout(() => {
            
            refetch();

        }, 60000);
        // Clear timeout if the component is unmounted
        
        return () => clearTimeout(timer);
       
    }, [loading, recall]);

    const refetch = async() => {
        try {
            const data1 = await jwt.sign({ 
                check: 1
            }, process.env.NEXT_PUBLIC_APIKEY, 
            { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

            const response = await axios.post("/api/listpayments",{
                data: data1
            });

            if(response.data.success){
                if (response.data.count == 1){
                    setpayments(response.data.payments)
                    setrecall(recall + 1)
                    return
                }
                setrecall(recall + 1)
                return    
                
            }
        }catch(error){
            setrecall(recall + 1)
            return
        }
    }


    const queryhistory = async() => {
       
        try {
            const data1 = await jwt.sign({ 
                check: 1
            }, process.env.NEXT_PUBLIC_APIKEY, 
            { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

            const response = await axios.post("/api/listpayments",{
                data: data1
            });

            if(response.data.success){
                if (response.data.count == 1){
                    setpayments(response.data.payments)
                    window.setTimeout(async() => {
                        setloading(true)
                    }, 2000);
                    return
                }
                
                if (response.data.count == 0){
                    window.setTimeout(async() => {
                        setloading(true)
                    }, 2000);
                    return
                }        
                
            }
            noty('Error loading page. Refresh', 4);
            return
        }catch(error){
            noty('Error loading page. Refresh', 4);
            return

        }

    }



    return (
      <>
        <PageWrapper
          headerConfig={{
            bgClass: "dynamic-sticky-bg",
            title: "Recent Payments | BudEarn"
          }}
        >
        {/* <!-- Hero Area --> */}
            <div className="bg-gradient-1 pt-26 pt-md-26 pt-lg-26 pt-xl-26 position-relative z-index-1 overflow-hidden">
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
                   
                    <h1 className="font-size-11 mb-10 pr-md-30 pr-lg-0">
                        Recent Payments
                  </h1>
                  
                  
                  {loading && <div>    
                {payments.length !== 0 && 

                <div>
                    <p className="mb-10 font-size-4">
                Recent {payments.length} payments
                </p>

                {payments.map(data => (
                <div key={data._id}><Nav.Link href={"https://www.blockchain.com/btc/tx/" + data.hash} className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    <div className="row">
                      <div className="ml-5 mr-5">
                        <div>
                          
                          <div>
                            <span className="line-height-2 d-block mb-0 font-weight-bold font-size-5 text-default-color">
                              Payment Reference: &nbsp;
                              <span className="font-size-4 font-weight-semibold heading-default-color">
                              #{data._id}
                            </span>
                            </span>
                          </div>
                          <hr/>

                          <div>
                            <span className="line-height-2 d-block mb-0 font-weight-bold font-size-5 text-default-color">
                              Name: &nbsp;
                              <span className="font-size-4 font-weight-semibold heading-default-color">
                              {data.name}
                            </span>
                            </span>
                          </div>
                          <hr/>

                          <div>
                            <span className="line-height-2 d-block mb-0 font-weight-bold font-size-5 text-default-color">
                              BTC Address: &nbsp;
                              <span style={{ wordWrap: 'break-word', display:'block', width: '250px'}} className="font-size-4 font-weight-semibold heading-default-color">
                              {data.addr}
                            </span>
                            </span>
                          </div>
                          <hr/>

                          <div>
                            <span className="line-height-2 d-block mb-0 font-weight-bold font-size-5 text-default-color">
                              Amount (USD): &nbsp;
                              <span className="font-size-4 font-weight-semibold heading-default-color">
                              ${data.price} USD
                            </span>
                            </span>
                          </div>
                          <hr/>

                          <div>
                            <span className=" line-height-2 d-blockmb-0 font-weight-bold font-size-5 heading-default-color">
                              {timeAgo.format(new Date(data.time), 'round')} &nbsp; <span className="text-blue"><a href={"https://www.blockchain.com/btc/tx/" + data.hash}>(View on blockchain.com)</a></span>
                            </span>
                          </div>



                        </div>
                      </div>

                     </div>


                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>
                </div>
                ))}
                </div>
                
                }
                  {payments.length == 0 && <div>No recent payments found.</div>}
                  </div>}

                  {!loading && <div> <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    
                        <ContentLoader 
                            speed={2}
                            width={'100%'}
                            height={200}
                            viewBox="0 0 200 100%"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#555353"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="40" rx="3" ry="3" width="60%" height="30" />  
                            <rect x="0" y="80" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="120" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="160" rx="3" ry="3" width="50%" height="30" />
                        </ContentLoader>
                    
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    
                        <ContentLoader 
                            speed={2}
                            width={'100%'}
                            height={200}
                            viewBox="0 0 200 100%"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#555353"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="40" rx="3" ry="3" width="60%" height="30" />  
                            <rect x="0" y="80" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="120" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="160" rx="3" ry="3" width="50%" height="30" />
                        </ContentLoader>
                    
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    
                        <ContentLoader 
                            speed={2}
                            width={'100%'}
                            height={200}
                            viewBox="0 0 200 100%"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#555353"
                        >
                            <rect x="0" y="0" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="40" rx="3" ry="3" width="60%" height="30" />  
                            <rect x="0" y="80" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="120" rx="3" ry="3" width="80%" height="30" /> 
                            <rect x="0" y="160" rx="3" ry="3" width="50%" height="30" />
                        </ContentLoader>
                    
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link> </div>}
                
                <div className="mb-5"><center>...</center></div>
             




                    </div>
                   
                </div>
                </div>
            </div>
    
      
        </PageWrapper>
      </>
    );
  };
  export default Recent;