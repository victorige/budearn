import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import loadingP from "../assets/image/loading.gif";
import jsCookie from 'js-cookie';
import axios from "axios";
import { noty } from "../utils/noty";
import { useRouter } from 'next/router'
import Protected from "../utils/protected"

var jwt = require('jsonwebtoken');

const Whistory = () => {

    const [loading, setloading] = useState(false)

    const [history, sethistory] = useState([])

    useEffect(() => {
        queryhistory()
    }, [])


    const queryhistory = async() => {
        const logtoken = await jsCookie.get("token")
        var loginfo = jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);

        try {
            const data1 = await jwt.sign({ 
                email: loginfo.email
            }, process.env.NEXT_PUBLIC_APIKEY, 
            { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

            const response = await axios.post("/api/whistory",{
                data: data1
            });

            if(response.data.success){
                if (response.data.count == 1){
                    sethistory(response.data.history)
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
         <PageWrapper headerConfig={{ button: "profile", title: "Payments | BudEarn" }}>
            <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
              <div className="container">
                 
              <div className="mb-14">
              <div className="row mb-11 align-items-center">
                <div className="col-lg-6 mb-lg-0 mb-4">
                  <h3 className="font-size-6 mb-0">Payments</h3>
                </div>

                </div>
              <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
                 
                <div className="table-responsive">

                {loading && <div>    
                {history.length !== 0 && 
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="pl-0  border-0 font-size-4 font-weight-normal"
                        >
                          BTC Address
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="border-0 font-size-4 font-weight-normal"
                        >
                          Status
                        </th>
                        
                      </tr>
                    </thead>
                   
                    <tbody>
                
                {history.map(data => (
                      <tr key={data._id} className="border border-color-2">
                        <th scope="row" className="pl-6 border-0 py-7 pr-0">

                              <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                                {(data.btcaddress).substring(0, 7)+"******"}
                              </h4>
                            
                        </th>
                        <td className="table-y-middle py-7  pr-0">
                          <h3 className="font-size-4 font-weight-normal text-black-2 mb-0">
                           ${data.amount} USD
                          </h3>
                        </td>
                        <td className="table-y-middle py-7 pr-0">
                        {data.status == 0 && <h3 className="font-size-4 font-weight-normal text-yellow mb-0">
                            Pending
                          </h3>}

                          {data.status == 1 && <h3 className="font-size-4 font-weight-normal text-green mb-0">
                            Success
                          </h3>}
                        </td>

                       </tr>
                ))} 
            
                     
                    </tbody>
                    
                  </table>}
                  {history.length == 0 && <div>No payments found.</div>}
                  </div>}

                  {!loading && <div>Loading...</div>}

                </div>

                 </div>
                 
                 {history.length !== 0 && <div className="mt-10 text-red font-size-4 font-weight-bold line-height-1p2">
                    <center> Pending might take upto 5 business days before it is sent to your Bitcoin Address.</center>
                 </div>}
            </div>
          
                 
              </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Protected(Whistory);