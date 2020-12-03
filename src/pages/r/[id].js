import React, { useContext, useState, useEffect } from "react";
import jsCookie from 'js-cookie';
import { useRouter } from 'next/router'

export function getServerSideProps(context) {
    return {
      props: {params: context.params}
    };
  }

const refer = (params) => {
    const router = useRouter()
    const rrf = async(params) =>{
        await jsCookie.set("referral", params.params.id)
        router.push('/')
    }
    useEffect(() => {  
        rrf(params)
    }, []);

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
    </div>
  );
};
export default refer;
