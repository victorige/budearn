import React, { useContext, useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import loadingP from "../assets/image/loading.gif";
import jsCookie from 'js-cookie';
import axios from "axios";
import { noty } from "../utils/noty";
import { useRouter } from 'next/router'
var passwordValidator = require('password-validator');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
import Protected from "../utils/protected"


const EditPassword = () => {
    const [showPassFirst, setShowPassFirst] = useState(true);
    const [showPassSecond, setShowPassSecond] = useState(true);
    const [password1, setPassword1] = useState('');
    const [email, setemail] = useState('');
    const [passwordValid1, setPasswordValid1] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordValid2, setPasswordValid2] = useState('');
    const [buttonText, setButtonText] = useState('Change Password');
    const [buttonImage, setButtonImage] = useState(null);
    const [button, setButton] = useState(true);
    const [input1, setinput1] = useState(false);
    const [input2, setinput2] = useState(false);

    const [submit, setsubmit] = useState(false);
    const togglePasswordFirst = () => {
        setShowPassFirst(!showPassFirst);
      };
    
      const togglePasswordSecond = () => {
        setShowPassSecond(!showPassSecond);
      };

      useEffect(() => {
        checkemail()
      }, [])

      const checkemail = async() => {
        const logtoken1 = await jsCookie.get("token")
        var loginfo1 = await jwt.verify(logtoken1, process.env.NEXT_PUBLIC_APIKEY);
        setemail(loginfo1.email)

      }

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
                setinput1(false);
            }else{
                setPasswordValid1(null);
                setinput1(true);
            }
        } 
        if(password2 !== ''){
            if(password2 != password1) {
                setPasswordValid2('Password does not match');
                setinput2(false);
            }else{
                setPasswordValid2(null);
                setinput2(true);
            }
        } 

       
        
        if(input1 && input2){
            setButton(false);
        }else{
            setButton(true);
        }
    }, [password1, password2, input1, input2]);

    const handleSubmit = async() => {
      if(!submit){
          if(input1 && input2){
              setsubmit(true)
              setButton(true);
              setButtonText(null);
              setButtonImage(loadingP);

              const logtoken = await jsCookie.get("token")
                var loginfo = await jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);

              var salt = bcrypt.genSaltSync(10);
              var hash = bcrypt.hashSync(password1, salt);
                      
          
                      const data1 = await jwt.sign({ 
                          email: loginfo.email,
                          password: hash
                      }, process.env.NEXT_PUBLIC_APIKEY, 
                      { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })
              
                  try {
                      const response1 = await axios.post("/api/cpassword",{
                          data: data1
                      });
                      if(response1.data.success){
                        setButton(false);
                        setPassword1('')
                        setPassword2('')
                        setPasswordValid1('')
                        setPasswordValid2('')
                        setButtonText('Change Password');
                        setButtonImage(null);
                        setsubmit(false)
                          noty('Done.',2);
                          return
                      }
          
                      noty('An error occured, please try again.',4);
                      setButton(false);
                      setButtonText('Change Password');
                      setButtonImage(null);
                      setsubmit(false)
                      return
                      
                    } catch (error) {
                      noty('An error occured, please try again.',4);
                      setButton(false);
                      setButtonText('Change Password');
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
     <PageWrapper headerConfig={{ button: "profile", title: "Change Password | BudEarn" }}>
        <div className="bg-default-2 pt-16 pb-12 pt-lg-22 pb-lg-27">
          <div className="container">
            <div className="row justify-content-center mt-14">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <h2 className="font-size-9 text-center mb-11">Change Password</h2>
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
                      htmlFor="email"
                      className="font-size-5 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Email 
                    </label>
                    <div className="position-relative">
                      <input
                        type={"text"}
                        className="form-control"
                        id="email"
                        value={email}
                        
                        readOnly={true}
                      />
                     
                    </div>
                  </div>
                  

                    <div className="col-12 mb-7">
                    <label
                      htmlFor="password"
                      className="font-size-5 text-black-2 font-weight-semibold line-height-reset"
                    >
                      New Password 
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
                  
                  <div className="col-12 mb-7">
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
                        placeholder="Enter password"
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
export default Protected(EditPassword);
