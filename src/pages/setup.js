import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import { Select } from "../components/Core";
import loadingP from "../assets/image/loading.gif";
import jsCookie from 'js-cookie';
import axios from "axios";
import { noty } from "../utils/noty";
import { useRouter } from 'next/router'
import Protected from "../utils/protected"

const countryList =  require("../utils/countryList.json");

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const gender = [
    { value: 1, label: "Male" },
    { value: 2, label: "Female" },
  ];

const Setup = () => {
    const router = useRouter()
    
    const [name, setName] = useState('');
    const [genderValue, setGenderValue] = useState(1);

    const [countryValue, setCountryValue] = useState("US");
    const [checkBox, setCheckBox] = useState(false);

    const [nameError, setNameError] = useState('');

    const [input1, setinput1] = useState(false);
    const [input2, setinput2] = useState(false);
    const [input3, setinput3] = useState(false);
    const [input4, setinput4] = useState(false);

    const [submit, setsubmit] = useState(false);

    const [button, setButton] = useState(true);

    const [buttonText, setButtonText] = useState('Complete');
    const [buttonImage, setButtonImage] = useState(null)
    
    useEffect(() => {  
        if(name == ''){
            setNameError('Enter your name');
            setinput1(false);
        }else{
            setNameError('');
            setinput1(true);
        }

        if(genderValue == 1 || genderValue == 2){
            setinput2(true);
        }else{
            setinput2(false);
        }

        if(countryValue !== ''){
            setinput3(true);
        }else{
            setinput3(false);
        }

        if(checkBox){
            setinput4(true);
        } 
        if(input1 && input2 && input3 && input4){
            setButton(false);
        }else{
            setButton(true);
        }

    
    }, [name, genderValue, countryValue, checkBox, input1, input2, input3, input4]);

    const handleSubmit = async() => {
        if(!submit){
            if(input1 && input2 && input3 && input4){
                
                setsubmit(true)
                setButton(true);
                setButtonText(null);
                setButtonImage(loadingP);

                const logtoken = await jsCookie.get("token")
                var loginfo = jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);
                
                var ClientJs = require('clientjs')
                var client = new ClientJS();
                var fingerprint = await client.getFingerprint();

                const token1 = await jwt.sign({
                    email: loginfo.email, 
                    fingerprint: fingerprint,
                    setup: 1
                }, process.env.NEXT_PUBLIC_APIKEY, 
                { expiresIn: '10y'  })
                
                const data1 = await jwt.sign({ 
                    email: loginfo.email,
                    name: name,
                    gender: genderValue,
                    country: countryValue,
                    balance: 0.00,
                    setup: 1
                }, process.env.NEXT_PUBLIC_APIKEY, 
                { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

                try {
                    const response1 = await axios.post("/api/setup",{
                        data: data1
                    });
                    if(response1.data.success){
                        setButtonText('Please wait...');
                        
                        await jsCookie.set("token", token1, { expires: 365 });
                        setButtonImage(null);
                        noty('Done.',2);
                        router.push('/home')
                        return
                    }
        
                    noty('An error occured, please try again.',4);
                    setButton(false);
                    setButtonText('Complete');
                    setButtonImage(null);
                    setsubmit(false)
                    return
                    
                  } catch (error) {
                    noty('An error occured, please try again.',4);
                    setButton(false);
                    setButtonText('Complete');
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
      <PageWrapper headerConfig={{ button: "profile", title: "Complete Registration | BudEarn" }}>
        <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <h2 className="font-size-9 text-center mb-11">Complete registration</h2>
                <div className="bg-white px-9 pt-9 pb-7 shadow-8 rounded-4">
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                    {/* You still need to add the hidden input with the form name to your JSX form */}
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="row">
                      <div className="col-12 mb-7">
                        <label
                          htmlFor="name"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Your Name
                          <div className="font-size-3 text-red">{nameError}</div>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="John Doe"
                          id="name"
                          name="name"
                          onChange={(e) => {
                            e.preventDefault();
                            setName(e.target.value);
                          }}
                          required={true}
                        />
                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="gender"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Gender
                        </label>
                        <Select
                            options={gender}
                           className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                            border={false}
                            onChange={(e) => {
                                setGenderValue(e.value);
                              }}
                            />

                      </div>
                      <div className="col-lg-6 mb-7">
                        <label
                          htmlFor="country"
                          className="font-size-4 font-weight-semibold text-black-2 mb-5 line-height-reset"
                        >
                          Country
                        </label>
                        <Select
                            options={countryList}
                            className="form-control pl-0 arrow-3 w-100 font-size-4 d-flex align-items-center w-100 "
                            border={false}
                            onChange={(e) => {
                                setCountryValue(e.value);
                              }}
                            />
                      </div>
                      <div className="form-group d-flex flex-wrap justify-content-between mb-1">
                        <label
                        htmlFor="terms-check2"
                        className="gr-check-input d-flex  mr-3"
                            >
                        <input
                            className="d-none"
                            type="checkbox"
                            id="terms-check2"
                            checked={checkBox}
                            onChange={() => {
                                setCheckBox(true)
                            }}
                            required={true}
                        />
                        <span className="checkbox mr-5"></span>
                        <span className="font-size-3 mb-0 line-height-reset d-block">
                            You must be at least 18 years old to complete registration.
                        </span>
                        </label>
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
export default Protected(Setup);
