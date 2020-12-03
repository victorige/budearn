import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import GlobalContext from "../context/GlobalContext";
import imgP from "../assets/image/patterns/hero-pattern.png";
import loadingP from "../assets/image/loading.gif";
import { useRouter } from 'next/router'
import Unprotected from "../utils/unprotected"
import Link from "next/link";

import axios from "axios";
import { noty } from "../utils/noty";
import jsCookie from 'js-cookie';

var jwt = require('jsonwebtoken');
var passwordValidator = require('password-validator');
const publicIp = require('public-ip');
var validator = require("email-validator");



const Login = () => {
  const router = useRouter()
    const [showPass, setShowPass] = useState(true);
    const gContext = useContext(GlobalContext);

    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [password1, setPassword1] = useState('');
    const [button, setButton] = useState(true);

    const [buttonText, setButtonText] = useState('Login');
    const [buttonImage, setButtonImage] = useState(null);

    const [input1, setinput1] = useState(false);
    const [input2, setinput2] = useState(false);

    const [submit, setsubmit] = useState(false);

    useEffect(() => {  
        if(email !== ''){
            const isValid = validator.validate(email);
            if(!isValid){
                setEmailValid('Enter a valid email address');
                setinput1(false);
            }else{
                setEmailValid(null);
                setinput1(true); 
            }
        }

        if(password1 !== ''){
            setinput2(true); 
        }else{
            setinput2(false); 
        }

        if(input1 && input2){
            setButton(false);
        }else{
            setButton(true);
        }

    }, [email, password1, input1, input2]);

    const togglePassword = () => {
        setShowPass(!showPass);
    };
    
    const handleSubmit = async() => {
        if(!submit){
            if(input1 && input2){
                setsubmit(true)
                setButton(true);
                setButtonText(null);
                setButtonImage(loadingP);

                var ClientJs = require('clientjs')
                var client = new ClientJS();
                var fingerprint = await client.getFingerprint();

                const datafinger = await jwt.sign({ 
                  email: email,
                  fingerprint: fingerprint
              }, process.env.NEXT_PUBLIC_APIKEY, 
              { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

                try {
                  const responsefinger = await axios.post("/api/fingerprint",{
                      data: datafinger
                  });
                  if(responsefinger.data.success){
                      if(responsefinger.data.allow == 1){


                const data1 = await jwt.sign({ 
                    email: email,
                    password: password1,
                    ip: await publicIp.v4()
                }, process.env.NEXT_PUBLIC_APIKEY, 
                { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })
                
                try {
                    const response1 = await axios.post("/api/login",{
                        data: data1
                    });
                    if(response1.data.success){

                        if(response1.data.match == 1){

                            const token1 = await jwt.sign({
                                email: email, 
                                fingerprint: fingerprint,
                                setup: response1.data.setup
                            }, process.env.NEXT_PUBLIC_APIKEY, 
                            { expiresIn: '10y'  })

                            await jsCookie.set("token", token1, { expires: 365 });
                            setButtonText('Please wait...');
                        
                            setButtonImage(null);
                            noty('Login was successful.',2);
                            router.push('/home')
                            return

                        }else if(response1.data.match == 0){
                            noty('Email or Password does not match', 3);
                            setButton(false);
                            setButtonText('Login');
                            setButtonImage(null);
                            setsubmit(false)
                            return
                        }

                        
                    }
        
                    noty('An error occured, please try again.',4);
                    setButton(false);
                    setButtonText('Login');
                    setButtonImage(null);
                    setsubmit(false)
                    return
                    
                  } catch (error) {
                    noty('An error occured, please try again.',4);
                    setButton(false);
                    setButtonText('Login');
                    setButtonImage(null);
                    setsubmit(false)
                    return
                   
                  }

                }else{
                  noty('Multiple accounts is not allowed. Try again in 24 hours time.', 3);
                  setButton(false);
                  setButtonText('Login');
                  setButtonImage(null);
                  setsubmit(false)
                  return
                }
            }

            noty('An error occured, please try again.',4);
            setButton(false);
            setButtonText('Login');
            setButtonImage(null);
            setsubmit(false)
            return
            
          } catch (error) {
            noty('An error occured, please try again.',4);
            setButton(false);
            setButtonText('Login');
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
        <PageWrapper
          headerConfig={{
            bgClass: "dynamic-sticky-bg",
            title: "Login | BudEarn"
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
                   
                    <h1 className="font-size-11 mb-3 pr-md-30 pr-lg-0">
                        Welcome Back
                  </h1>
                  <p className="mb-10 font-size-4">
                    Log in to continue your account and start earning.
                  </p>
                  <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                  <div className="form-group">
                    <label
                      htmlFor="email"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      E-mail
                      <div className="font-size-3 text-red">{emailValid}</div>
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      id="email"
                      value={email}
                      onChange={(e) => {
                        e.preventDefault();
                        setEmail(e.target.value);
                      }}
                      required={true}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPass ? "password" : "text"}
                        className="form-control"
                        autoComplete="new-password"
                        id="password"
                        placeholder="Enter password"
                        value={password1}
                        onChange={(e) => {
                            e.preventDefault();
                            setPassword1(e.target.value);
                        }}
                        required={true}
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePassword();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between">
                    <label
                      htmlFor="terms-check"
                      className="gr-check-input d-flex  mr-3"
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check"
                      />
                      <span className="checkbox mr-5"></span>
                      <span className="font-size-3 mb-0 line-height-reset mb-1 d-block">
                        Remember password
                      </span>
                    </label>
                    <Link href="/reset">
                    <a
                      className="font-size-3 text-dodger line-height-reset"
                    >
                      Forget Password
                    </a>
                    </Link>
                  </div>
                  <div className="form-group mb-8">
                    <button className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase" disabled={button}>
                        {buttonText} <img src={buttonImage} alt=""/>
                    </button>
                  </div>
                  <p className="font-size-4 text-center heading-default-color">
                    Don’t have an account?{" "}
                    <Link href="/register">
                    <a  className="text-primary">
                      Create a free account
                    </a>
                    </Link>
                  </p>
                </form>
             
                    </div>
                   
                </div>
                </div>
            </div>
    
      
        </PageWrapper>
      </>
    );
  };
  export default Unprotected(Login);