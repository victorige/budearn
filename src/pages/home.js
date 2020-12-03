import React, { useContext, useEffect, useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import GlobalContext from "../context/GlobalContext";
import ContentLoader from "react-content-loader";
import PageWrapper from "../components/PageWrapper";
import { noty } from "../utils/noty";
import imgF4 from "../assets/image/l2/png/featured-job-logo-4.png";

import star from "../assets/image/l2/png/star.png";
import refer from "../assets/image/l2/png/refer.png";

import iconD from "../assets/image/svg/icon-dolor.svg";
var jwt = require('jsonwebtoken');
import axios from "axios";
import jsCookie from 'js-cookie';

import Protected from "../utils/protected"



const Home = () => {
  const gContext = useContext(GlobalContext);
    const [loading, setloading] = useState(false)

    const [status, setstatus] = useState(0)
    const [gender, setgender] = useState(0)
    const [name, setname] = useState(0)
    const [daily, setdaily] = useState(0)
    const [page, setpage] = useState(0)
    const [infodaily, setinfodaily] = useState(0)
    const [shareday, setshareday] = useState(0)
    const [userid, setuserid] = useState('')
    const [refcount, setrefcount] = useState(0)
    const [balance, setbalance] = useState('')

    const [infoonextdate, setinfoonextdate] = useState(null)



    useEffect(() => {
        queryhome()
    }, [])

    const queryhome = async() => {
        const logtoken = await jsCookie.get("token")
        var loginfo = jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);

        try {
            const data1 = await jwt.sign({ 
                email: loginfo.email
            }, process.env.NEXT_PUBLIC_APIKEY, 
            { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

            const response = await axios.post("/api/home",{
                data: data1
            });

            if(response.data.success){
                
                setshareday(response.data.shareday)
                setinfoonextdate(response.data.infoonextdate)
                setinfodaily(response.data.infodaily)
                setdaily(response.data.daily)
                setpage(response.data.page)
                setname(response.data.name)
                setgender(response.data.gender)
                setstatus(response.data.status)
                setuserid(response.data.userid)
                setrefcount(response.data.refcount)
                setbalance(response.data.balance)

                window.setTimeout(async() => {
                    setloading(true)
                }, 2000);

                return
                
                
            }
            noty('Error loading page. Refresh', 4);
            return
        }catch(error){
            noty('Error loading page. Refresh', 4);
            return

        }
    }


   
    
    const share = async() => {
        const logtoken = await jsCookie.get("token")
        var loginfo = jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);

        const unique = Date.now()
       
        const sharedata = await jwt.sign({ 
            email: loginfo.email,
            code: unique
        }, process.env.NEXT_PUBLIC_APIKEY, 
        { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

          try {
            const responseshare = await axios.post("/api/share",{
                data: sharedata
            });
            if(responseshare.data.success){
                return window.location = "https://www.facebook.com/dialog/share?app_id="+process.env.NEXT_PUBLIC_FBAPPID+"&display=popup&href=" + process.env.NEXT_PUBLIC_SHAREURL + "/?s="+ unique + "&redirect_uri="+ process.env.NEXT_PUBLIC_SHAREURL +"/share"
            }
        }catch(error){
            noty('Sharing failed. Please, try again', 4);
            return
        }

    }

    const copyrefer = async() => {
        var copyText = document.getElementById("refer");

        
        copyText.select(); 
        copyText.setSelectionRange(0, 99999); /*For mobile devices*/

        /* Copy the text inside the text field */
        document.execCommand("copy");

        /* Alert the copied text */
        noty('Link successfully copied to clipboard.', 1);
    }


    const calculateTimeLeft = () => {
        
        
        let difference = +new Date(infoonextdate) - +new Date();
        
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            D: Math.floor(difference / (1000 * 60 * 60 * 24)),
            H: Math.floor((difference / (1000 * 60 * 60)) % 24),
            M: Math.floor((difference / 1000 / 60) % 60),
            S: Math.floor((difference / 1000) % 60)
        };
      }
    
      return timeLeft;
    
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    


    useEffect(() => {
        const timer=setTimeout(() => {
            
                setTimeLeft(calculateTimeLeft());

        }, 1000);
        // Clear timeout if the component is unmounted
        
        return () => clearTimeout(timer);
       
    }, [timeLeft]);

      const timerComponents = [];

        Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
            return;
        }

        timerComponents.push(
            <span key={interval} className="text-green font-size-6 font-weight-semibold">
            {timeLeft[interval]}<span className="font-size-3">{interval}</span>  &nbsp;

            </span>
        );
        });


  return (
    <>
      <PageWrapper headerConfig={{ button: "profile", title:"Home | BudEarn" }}>
        <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
            <div className="container">

            {loading && <div>
                <div className="d-flex align-items-center justify-content-between mb-6">
                  <h5 className="font-size-4 font-weight-normal text-gray">
                    Hello, <span className="text-black-2"> {name} {gender == 1 && '(M)'}{gender == 2 && '(F)'}</span>
                    
                        <span className="mr-4 text-green font-size-5 font-weight-bold line-height-1p2 text-uppercase">
                            &nbsp;&nbsp;&nbsp;${balance} USD
                        </span>
                    
                  </h5>
                </div>

            
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img src={star} alt="" />
                          </div>
                          <div>
                            <h3 className="mb-0 font-size-6 heading-default-color">
                              Caption our Photos
                            </h3>
                            <span className="font-size-3 text-default-color line-height-2 d-block">
                              Captioning
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-5">
                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src={iconD} alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">8</span> USD
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="row pt-8">
                    
                      <div className="text-black col-md-7">
                        Write a caption on some of our nice sexy pictures and earn $8.

                      </div>
                      
                    </div>

                    <div className="mt-8 text-right">

                    {(infodaily == daily && status == 1) &&
                    <div className="mr-4">
                        
                        {timerComponents.length ? timerComponents : 
                        
                            <Link href="/review">
                                    <div className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                        Write Captions
                                    </div>
                            </Link>
                        }
                        
                    </div>
                    }

                  {(infodaily !== daily) && <Link href="/review">
                                <div className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                    Write Captions
                                </div>
                    </Link>
                    }

                    {(infodaily == daily && status !== 1) && 
                    
                    <div>
                         <div className="text-green font-size-6 font-weight-semibold mr-4">
                            {51-page} Captions Left
                         </div>
                        
                        <Link href="/review">
                                <div className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                    Write Captions
                                </div>
                    </Link>
                    </div>
                    }

                            
                        </div>

                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>
                
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img src={imgF4} alt="" />
                          </div>
                          <div>
                            <h3 className="mb-0 font-size-6 heading-default-color">
                              Share us on Facebook
                            </h3>
                            <span className="font-size-3 text-default-color line-height-2 d-block">
                              Share
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-5">
                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src={iconD} alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">2</span> USD
                          </p>
                        </div>
                      </div>
                    </div>


                    <div className="row pt-8">
                    
                      <div className="text-black col-md-7">
                        Share us on your Facebook profile and earn $2.

                      </div>
                      
                    </div>

                    <div className="mt-8 text-right">

                            {infodaily == shareday && <div className="mr-4">
                                
                                {timerComponents.length ? timerComponents : 
                                
                                    <div onClick={() => share()} className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                        Share
                                    </div>
                                }
                                
                            </div>}


                            
                                {infodaily !== shareday && <div onClick={() => share()} className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                    Share
                                </div>}
                            
                        </div>

                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>

                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          <div className="square-72 d-block mr-8">
                            <img src={refer} alt="" />
                          </div>
                          <div>
                            <h3 className="mb-0 font-size-6 heading-default-color">
                            Earn 10% Of Caption Earnings For Life
                            </h3>
                            <span className="font-size-3 text-default-color line-height-2 d-block">
                                Refer &amp; Earn
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 text-right pt-7 pt-md-5">

                        <div className="media justify-content-md-end">
                          <div className="image mr-5 mt-2">
                            <img src={iconD} alt="" />
                          </div>
                          <p className="font-weight-bold font-size-7 text-hit-gray mb-0">
                            <span className="text-black-2">0.8</span> USD <span className="text-black-2">(10%)</span>
                          </p>
                        </div>
                       
                       

                      </div>
                    </div>


                    <div className="row pt-8">
                    
                      <div className="text-black col-md-7">
                          
                      Refer your friends and family and earn 10% ($0.8) of their caption earnings for the life of their account. 
                              
                              <div className="mt-5 font-weight-bold font-size-7 text-black-2">{refcount} {refcount <= 1 && 'Refer'}{refcount > 1 && 'Refers'}</div>
                        

                      </div>
                      
                    </div>

                    <div className="mt-8 text-right">
                    <div className="mb-8"><input
                      type="text"
                      className="form-control"
                      id="refer"
                      value={process.env.NEXT_PUBLIC_HOST+'/r/'+userid}
                      readOnly={true}
                      width={"25%"}
                    /></div>
                            
                                <div onClick={() => copyrefer()} className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                    Copy Link
                                </div>
                            
                        </div>

                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>
                

                </div>
                }

            {!loading &&
                <div>
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    
                        <ContentLoader 
                            speed={2}
                            width={'100%'}
                            height={130}
                            viewBox="0 0 300 100%"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#555353"
                        >
                            <rect x="48" y="8" rx="3" ry="3" width="35%" height="6" /> 
                            <rect x="48" y="26" rx="3" ry="3" width="30%" height="6" /> 
                            <rect x="0" y="56" rx="3" ry="3" width="80%" height="6" /> 
                            <rect x="0" y="72" rx="3" ry="3" width="80%" height="6" /> 
                            <rect x="0" y="88" rx="3" ry="3" width="75%" height="6" />
                            <circle cx="20" cy="20" r="20" />
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
                            height={130}
                            viewBox="0 0 300 100%"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#555353"
                        >
                            <rect x="48" y="8" rx="3" ry="3" width="35%" height="6" /> 
                            <rect x="48" y="26" rx="3" ry="3" width="30%" height="6" /> 
                            <rect x="0" y="56" rx="3" ry="3" width="80%" height="6" /> 
                            <rect x="0" y="72" rx="3" ry="3" width="80%" height="6" /> 
                            <rect x="0" y="88" rx="3" ry="3" width="75%" height="6" />
                            <circle cx="20" cy="20" r="20" />
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
                            height={130}
                            viewBox="0 0 300 100%"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#555353"
                        >
                            <rect x="48" y="8" rx="3" ry="3" width="35%" height="6" /> 
                            <rect x="48" y="26" rx="3" ry="3" width="30%" height="6" /> 
                            <rect x="0" y="56" rx="3" ry="3" width="80%" height="6" /> 
                            <rect x="0" y="72" rx="3" ry="3" width="80%" height="6" /> 
                            <rect x="0" y="88" rx="3" ry="3" width="75%" height="6" />
                            <circle cx="20" cy="20" r="20" />
                        </ContentLoader>
                    
                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>
                </div>
                }

                <div className="mb-5"><center>...</center></div>
            
            </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Protected(Home);
