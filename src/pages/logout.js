import React, { useContext, useState, useEffect } from "react";
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router'

const logout = () => {
    const router = useRouter()

    useEffect(() => { 
        verify()
    }, []);

    const verify = async() => {
        await jsCookie.remove("token")
        router.push('/') 
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
      <div>logging out...</div>
      
    </div>
  );
};
export default logout;
