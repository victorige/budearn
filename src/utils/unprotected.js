import React, {Component, useEffect} from 'react'
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');

export default Component => {

    const Unprotected = props => {
        const router = useRouter()
        
        useEffect(() => {
            checkloging()
        });

        const checkloging = async() => {
            const logtoken = await jsCookie.get("token")
            if(logtoken){
                router.push('/home')
                return
            }else{
                
                return
            }
        }

        return <Component {...props} />;
    };

    Unprotected.getInitialProps = async ctx => {
        
        return { thing: true };
    };

    return Unprotected;
};