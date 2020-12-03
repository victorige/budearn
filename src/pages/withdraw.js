import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import loadingP from "../assets/image/loading.gif";
import jsCookie from 'js-cookie';
import axios from "axios";
import { noty } from "../utils/noty";
import { useRouter } from 'next/router'
import Protected from "../utils/protected"

import validate from 'bitcoin-address-validation';

var jwt = require('jsonwebtoken');


const Withdraw = () => {
    const router = useRouter()
    const [bitcoinad, setbitcoinad] = useState('');
    const [bitcoinadValid, setbitcoinadValid] = useState('');
    
    const [buttonText, setButtonText] = useState('Withdraw');
    const [buttonImage, setButtonImage] = useState(null);
    const [button, setButton] = useState(true);
    const [input1, setinput1] = useState(false);

    const [submit, setsubmit] = useState(false);
    
    useEffect(() => {

        if(bitcoinad !== ''){
           
            const isValid = validate(bitcoinad)
            
            if(!isValid){
                setbitcoinadValid('Enter a valid bitcoin address');
                setinput1(false);
            }else{
                setbitcoinadValid(null);
                setinput1(true);
            }
        } 
      
        
        if(input1){
            setButton(false);
        }else{
            setButton(true);
        }
    }, [bitcoinad, input1]);

    const handleSubmit = async() => {
      if(!submit){
          if(input1){
              setsubmit(true)
              setButton(true);
              setButtonText(null);
              setButtonImage(loadingP);

              const logtoken = await jsCookie.get("token")
                var loginfo = jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);

          
                      const data1 = await jwt.sign({ 
                          email: loginfo.email,
                          btcaddress: bitcoinad
                      }, process.env.NEXT_PUBLIC_APIKEY, 
                      { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })
              
                  try {
                      const response1 = await axios.post("/api/withdraw",{
                          data: data1
                      });
                      if(response1.data.success){
                          if(response1.data.withdraw == 1){
                            setButtonText('Please wait...');
                        
                            setButtonImage(null);
                            noty('Your $'+ response1.data.amount +' USD Withdrawal is successful.',2);
                            router.push('/whistory')
                            return
                          }
                          if(response1.data.withdraw == 2){
                            setButton(false);
                            setButtonText('Withdraw');
                            setButtonImage(null);
                            setsubmit(false)
                            noty('Minimum withdrawal is $300.',3);
                            return
                          }

                      }
          
                      noty('An error occured, please try again.',4);
                      setButton(false);
                      setButtonText('Withdraw');
                      setButtonImage(null);
                      setsubmit(false)
                      return
                      
                    } catch (error) {
                      noty('An error occured, please try again.',4);
                      setButton(false);
                      setButtonText('Withdraw');
                      setButtonImage(null);
                      setsubmit(false)
                      return
                     
                    }



            }else{
              setButton(false);
          }

      
    
        }
      
      
    }

        
  return (
    <>
     <PageWrapper headerConfig={{ button: "profile", title: "Withdraw Money | BudEarn" }}>
        <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <h2 className="font-size-9 text-center mb-11">Withdraw to your Bitcoin Address</h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input type="hidden" name="form-name" value="password" />
                    <div className="row">

                    <div className="col-12 mb-7">
                    <label
                      htmlFor="password"
                      className="font-size-5 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Bitcoin Address 
                      <div className="font-size-3 text-red">{bitcoinadValid}</div>
                    </label>
                    <div className="position-relative">
                      <input
                        type={"text"}
                        className="form-control"
                        id="bitcoin"
                        placeholder="Enter Bitcoin Address"
                        value={bitcoinad}
                        onChange={(e) => {
                            e.preventDefault();
                            setbitcoinad(e.target.value);
                        }}
                        required={true}
                      />
                      
                        
                    </div>
                  </div>
                  
               

                      <div className="col-lg-12 pt-4">
                        <button
                          type="submit"
                          className="btn btn-primary text-uppercase w-100 h-px-48"
                          disabled={button}
                        >
                          {buttonText} <img src={buttonImage} alt=""/>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
};
export default Protected(Withdraw);
