// import App from 'next/app'
import Layout from "../components/Layout";
import { GlobalProvider } from "../context/GlobalContext";

import "../assets/fonts/fontawesome-5/webfonts/fa-brands-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-regular-400.ttf";
import "../assets/fonts/fontawesome-5/webfonts/fa-solid-900.ttf";

import "../assets/fonts/icon-font/fonts/avasta.ttf";
import "../assets/fonts/icon-font/css/style.css";

import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import "../../node_modules/aos/dist/aos.css";

import "../assets/fonts/icon-font/css/style.css";
import "../assets/fonts/fontawesome-5/css/all.css";

import "../scss/bootstrap.scss";
import "../scss/main.scss";

import "../../node_modules/noty/lib/noty.css";  
import "../../node_modules/noty/lib/themes/nest.css";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "nprogress/nprogress.css";
import dynamic from 'next/dynamic'

import React, { useContext, useState, useEffect } from "react";
import { noty } from "../utils/noty";
import axios from "axios";
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')

import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');

const TopProgressBar = dynamic(
  () => {
    return import("../components/TopProgressBar/TopProgressBar");
  },
  { ssr: false },
);

const MyApp = ({ Component, pageProps, router }) => {

  const [loading, setloading] = useState(false)
    const [recall, setrecall] = useState(0)

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    const timer=setTimeout(() => {
        
        refetch();

    }, 30000);
    // Clear timeout if the component is unmounted
    
    return () => clearTimeout(timer);
   
}, [loading, recall]);

const refetch = async() => {
    try {
        const data1 = await jwt.sign({ 
            check: 1
        }, process.env.NEXT_PUBLIC_APIKEY, 
        { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })

        const response = await axios.post("/api/notification",{
            data: data1
        });

        if(response.data.success){
            if (response.data.count == 1){
              var payyy = response.data.payments[0]
                if(await jsCookie.get("noty") !== payyy._id){
                  noty('🤑 $'+payyy.price+' paid to ' + payyy.name +'. ('+ timeAgo.format(new Date(payyy.time), 'round')+')', 9);
                  await jsCookie.set("noty", payyy._id)
                }
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

  

  if (router.pathname.match(/404/)) {
    return (
      <GlobalProvider>
        <TopProgressBar/>
        <Layout pageContext={{ layout: "bare" }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  }
  if (router.pathname.match(/dashboard/)) {
    return (
      <GlobalProvider>
        <TopProgressBar/>
        <Layout pageContext={{ layout: "dashboard" }}>
          <Component {...pageProps} />
        </Layout>
      </GlobalProvider>
    );
  }

  return (
    <GlobalProvider>
      <TopProgressBar/>
      <Layout pageContext={{}}>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </GlobalProvider>
  );
};

export default MyApp;
