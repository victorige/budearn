import React, { useContext, useState, useEffect } from "react";
var jwt = require('jsonwebtoken');
import axios from "axios";
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router'
import Protected from "../utils/protected"

const Share = () => {
    const router = useRouter()

    const [checking, setchecking] = useState(false);
    const [success, setsuccess] = useState(false);
    const [fail, setfail] = useState(false);

    useEffect(() => { 
        verify()
    }, []);

    const verify = async() => {
        window.setTimeout(async() => {
        const logtoken = await jsCookie.get("token")
        var loginfo = await jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY);
        
        try {
            setchecking(true)

            const data1 = await jwt.sign({ 
                email: loginfo.email
            }, process.env.NEXT_PUBLIC_APIKEY, 
            { expiresIn: process.env.NEXT_PUBLIC_EXTIME  })
            
            

            const response = await axios.post("/api/shareverify",{
                data: data1
            });
            if(response.data.success){
                setsuccess(true)
                router.push('/home')
                return
            }
            setfail(true)
            router.push('/home')
            return
        }catch(error){
            setfail(true)
            router.push('/home')
            return
        }
    }, 5000);
    }

  return (
    <div style={{zIndex: '100000',
    background: '#fff', 
    width:      '100%',
    height:     '100%', 
    top:        '0',
    left:       '0',
    position:   'fixed',
}}>
      <div>Please Wait...</div>
      {checking && <div>Scanning your Facebook profile for the share...</div>}
      {success && <div>Share Successful</div>}
      {fail && <div>Share Failed</div>}
    </div>
  );
};
export default Protected(Share);
