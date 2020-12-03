import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import imgP from "../assets/image/patterns/hero-pattern.png";
import loadingP from "../assets/image/loading.gif";
import axios from "axios";
import { noty } from "../utils/noty";
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router'
import Unprotected from "../utils/unprotected"
import Link from "next/link";

var jwt = require('jsonwebtoken');
var passwordValidator = require('password-validator');
const publicIp = require('public-ip');
var validator = require("email-validator");
var bcrypt = require('bcryptjs');

const Register = () => {
  const router = useRouter()

    const [showPassFirst, setShowPassFirst] = useState(true);
    const [showPassSecond, setShowPassSecond] = useState(true);
    const [email, setEmail] = useState('');
    const [emailValid, setEmailValid] = useState('');
    const [password1, setPassword1] = useState('');
    const [passwordValid1, setPasswordValid1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordValid2, setPasswordValid2] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [button, setButton] = useState(true);
    const [referral, setReferral] = useState(null);

    const [input1, setinput1] = useState(false);
    const [input2, setinput2] = useState(false);
    const [input3, setinput3] = useState(false);
    const [input4, setinput4] = useState(false);

    const [buttonText, setButtonText] = useState('Sign Up');
    const [buttonImage, setButtonImage] = useState(null);

    const [submit, setsubmit] = useState(false);


    const [test, setTest] = useState('');

    const checkemail = async () => {
        
        if(email !== ''){
            
            const isValid = validator.validate(email);
            if(!isValid){
                setEmailValid('Enter a valid email address');
                setinput1(false);
            }else{
                const data = await jwt.sign({ 
                    email :email
                }, process.env.NEXT_PUBLIC_APIKEY, 
                { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })
        
            try {
                const response = await axios.post("/api/checkemail",{
                    data: data
                });
                if(response.data.email == 0){
                   setEmailValid(null);
                    setinput1(true); 
                }
                if(response.data.email == 1){
                    setEmailValid('Email already exist');
                    setinput1(false);
                 }
                 return
                
              } catch (error) {
                setEmailValid('An error occured, please try again.');
                setinput1(false);
                return
               
              }
            }
        } 
    }

    useEffect(() => {  
        checkemail();
    }, [email]);



    useEffect(() => {

        if(password1 !== ''){
            var schema = new passwordValidator();
            schema
            .is().min(6) 
            .has().letters(1) 
            .has().digits(1)                            
            .has().not().spaces()                     
            const isValid = schema.validate(password1);
            
            
            if(!isValid){
                setPasswordValid1('Password must contain at least one letter, at least one number, and be longer than six charaters.');
                setinput2(false);
            }else{
                setPasswordValid1(null);
                setinput2(true);
            }
        } 
        if(password2 !== ''){
            if(password2 != password1) {
                setPasswordValid2('Password does not match');
                setinput3(false);
            }else{
                setPasswordValid2(null);
                setinput3(true);
            }
        } 

        if(checkBox){
            setinput4(true);
        } 
        
        if(input1 && input2 && input3 && input4){
            setButton(false);
        }else{
            setButton(true);
        }
    }, [password1, password2, checkBox, input1, input2, input3, input4]);

    useEffect(() => {
      reff()
    }, [])
  
    const reff = async() => {
          if(jsCookie.get("referral") !== undefined){
            setReferral(await jsCookie.get("referral"));
        }

    }

    const togglePasswordFirst = () => {
        setShowPassFirst(!showPassFirst);
      };
    
      const togglePasswordSecond = () => {
        setShowPassSecond(!showPassSecond);
      };

      const handleSubmit = async() => {
        if(!submit){
            if(input1 && input2 && input3 && input4){
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

                      const token1 = await jwt.sign({
                          email: email, 
                          fingerprint: fingerprint,
                          setup: 0
                      }, process.env.NEXT_PUBLIC_APIKEY, 
                      { expiresIn: '10y'  })
          
                      
                      var salt = bcrypt.genSaltSync(10);
                      var hash = bcrypt.hashSync(password1, salt);
                      
          
                      const data1 = await jwt.sign({ 
                          email: email,
                          password: hash,
                          ip: await publicIp.v4(),
                          token: token1,
                          referral: referral,
                          setup: 0
                      }, process.env.NEXT_PUBLIC_APIKEY, 
                      { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })
              
                  try {
                      const response1 = await axios.post("/api/register",{
                          data: data1
                      });
                      if(response1.data.success){
                          setButtonText('Please wait...');
                          
                          await jsCookie.set("token", token1, { expires: 365 });
                          setButtonImage(null);
                          noty('Registration was successful.',2);
                          router.push('/setup')
                          return
                      }
          
                      noty('An error occured, please try again.',4);
                      setButton(false);
                      setButtonText('Sign Up');
                      setButtonImage(null);
                      setsubmit(false)
                      return
                      
                    } catch (error) {
                      noty('An error occured, please try again.',4);
                      setButton(false);
                      setButtonText('Sign Up');
                      setButtonImage(null);
                      setsubmit(false)
                      return
                     
                    }

                      }else{
                        noty('Multiple accounts is not allowed. Try again in 24 hours time.', 3);
                        setButton(false);
                        setButtonText('Sign Up');
                        setButtonImage(null);
                        setsubmit(false)
                        return
                      }
                  }
      
                  noty('An error occured, please try again.',4);
                  setButton(false);
                  setButtonText('Sign Up');
                  setButtonImage(null);
                  setsubmit(false)
                  return
                  
                } catch (error) {
                  noty('An error occured, please try again.',4);
                  setButton(false);
                  setButtonText('Sign Up');
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
            title: "Register | BudEarn"
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
                        Create a free account today
                  </h1>
                  <p className="mb-10 font-size-4">
                    Create your account to continue and start earning.
                  </p>
                <form onSubmit={
                    (e) => {
                        e.preventDefault();
                        handleSubmit()
                    }}>
                  <div className="form-group">
                    <label
                      htmlFor="email2"
                      className="font-size-5 text-black-2 font-weight-semibold line-height-reset"
                    >
                      E-mail 
                      <div className="font-size-3 text-red">{emailValid}</div>
                    </label>
                    
                    <input
                      type="email"
                      className="form-control"
                      placeholder="example@gmail.com"
                      autoComplete="email"
                      id="email2"
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
                      className="font-size-5 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password 
                      <div className="font-size-3 text-red">{passwordValid1}</div>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassFirst ? "password" : "text"}
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
                          togglePasswordFirst();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label
                      htmlFor="password2"
                      className="font-size-5 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Confirm Password 
                      <div className="font-size-3 text-red">{passwordValid2}</div>
                    </label>
                    <div className="position-relative">
                      <input
                        type={showPassSecond ? "password" : "text"}
                        className="form-control"
                        autoComplete="new-password"
                        id="password2"
                        placeholder="Confirm password"
                        value={password2}
                        onChange={(e) => {
                            e.preventDefault();
                            setPassword2(e.target.value);
                        }}
                        required={true}
                      />
                      <a
                        href="/#"
                        className="show-password pos-abs-cr fas mr-6 text-black-2"
                        onClick={(e) => {
                          e.preventDefault();
                          togglePasswordSecond();
                        }}
                      >
                        <span className="d-none">none</span>
                      </a>
                    </div>
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
                        Agree to the{" "}
                        <Link href="/terms">
                          <a className="text-primary">
                            Terms &amp; Conditions
                          </a>
                        </Link>
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
                    Already have an account?{" "}
                    <Link href="/login">
                    <a className="text-primary">
                      Login to your account
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
  export default Unprotected(Register);