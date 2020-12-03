import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../context/GlobalContext";
import { Nav, Tab } from "react-bootstrap";
import Link from "next/link";
import ContentLoader from "react-content-loader";
import PageWrapper from "../components/PageWrapper";
import loadingPicture from "../assets/image/loadingpicture.gif";
import axios from "axios";
import { useRouter } from 'next/router'
import { noty } from "../utils/noty";
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');
import Protected from "../utils/protected"




const Review = () => {
  const gContext = useContext(GlobalContext);
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [picture, setPicture] = useState(loadingPicture);

    const [adnum, setadnum] = useState(null);
    const [adclick, setadclick] = useState(0);
    const [page, setpage] = useState(0);
    const [email, setemail] = useState('');

    useEffect(() => { 
        fetchpicture()
    }, []);

    const fetchpicture = async() => {
        
        const logtoken = await jsCookie.get("token")
        var loginfo = jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);

        try {
            const data1 = await jwt.sign({ 
                email: loginfo.email
            }, process.env.NEXT_PUBLIC_APIKEY, 
            { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

            const response = await axios.post("/api/startreview",{
                data: data1
            });
            if(response.data.success){

                if(response.data.status == 0){

                setadnum(response.data.adnum)
                setadclick(response.data.adclick)
                setpage(response.data.page)
                setemail(response.data.email)
                try {
                    const response1 = await axios.get("/api/viewpictures");
                    if(response1.data.success){
                        setPicture(response1.data.pictures[response.data.page-1].image)
                        window.setTimeout(async() => {
                            setLoading(true)
                        }, 2000);
                        
                        return
                    }
        
                    noty('Error loading photo. Refresh', 4);
                    return
                    
                  } catch (error) {
                    noty('Error loading photo. Refresh', 4);
                    return
                   
                  }

                }else{
                    noty('Done', 2);
                    router.push('/home')
                    return
                }



            }

            noty('Error loading photo. Refresh', 4);
            return
            
          } catch (error) {
            noty('Error loading photo. Refresh', 4);
            return
           
          }


        
    }


    const gotoreview = async() => {
        const server = await jwt.sign({ 
            email: email,
            adclick: adclick,
            page: page,
            adnum: adnum,
            goto: 1
        }, '67107776',
        { expiresIn: '1h'  })
    
        window.location.href = process.env.NEXT_PUBLIC_REVIEW_URL+"?tkt="+server;

    }

  return (
    <>
      <PageWrapper headerConfig={{ button: "profile", title:"Captioning | BudEarn" }}>
        <div className="bg-default-2 pt-16 pt-lg-22 pb-lg-27">
            <div className="container">
                {/* <!-- back Button --> */}
                <div className="row justify-content-center">
                <div className="col-12 dark-mode-texts">
                    <div className="mb-9">
                    <Link href="/home">
                        <a className="d-flex align-items-center ml-4">
                        <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                        <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                            Back
                        </span>
                        </a>
                    </Link>
                    </div>
                </div>
                </div>
                {/* <!-- back Button End --> */}

           {loading && <div>
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="media align-items-center">
                          
                          <div>
                     {adnum !== page &&   <h3 className="mb-0 font-size-6 heading-default-color">
                              Photo {page} of 50
                            </h3>
                        }

                    {adnum == page &&   <h3 className="mb-0 font-size-6 heading-default-color">
                              Visit our sponsor
                            </h3>
                        }

                          </div>
                        </div>
                        
                      </div>

                      </div>

                      {adnum !== page && <div className="mt-8">

                               {page !== 0 && <div onClick={() => gotoreview()} className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                    Write a Caption
                                </div> } 
                           
                        </div>}

                        {adnum == page && <div className="mt-8">

                               {page !== 0 && <div onClick={() => gotoreview()} className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                                    Visit Sponsor
                                </div> } 
                           
                        </div>}


                    <div className="row pt-8 text-center">
                    
                    {adnum !== page && <img height={'100%'} width={'100%'} src={picture} /> }

                    {adnum == page && <div>
                        
                            <b>To continue, you need to visit our sponsor website for a minute. Thank you :)</b>
                        
                    </div> }
                    </div>

                    

                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>

                </div>}

                {!loading && <div>
                <Nav.Link className="mb-8 p-0 w-100" eventKey="second">
                  {/* <!-- Single Featured Job --> */}
                  <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3 hover-border-green">
                  <ContentLoader 
                    speed={2}
                    width={'100%'}
                    height={350}
                    viewBox="0 0 100% 460"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#555353"
                >
                    
                    <rect x="0" y="18" rx="2" ry="2" width="60%" height="10" /> 
                    <rect x="0" y="34" rx="2" ry="2" width="50%" height="10" /> 
                    <rect x="0" y="60" rx="2" ry="2" width="100%" height="350" />
                </ContentLoader>

                  </div>
                  {/* <!-- End Single Featured Job --> */}
                </Nav.Link>

                </div>}
                <div className="mb-5"><center>...</center></div>



            
            </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Protected(Review);
