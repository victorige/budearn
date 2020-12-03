import React, {Component, useEffect} from 'react'
import { useRouter } from 'next/router'
import jsCookie from 'js-cookie';
var jwt = require('jsonwebtoken');

export default Component => {

    const Protected = props => {
        const router = useRouter()
        
        useEffect(() => {
            checkloging()
        });

        const checkloging = async() => {
            const logtoken = await jsCookie.get("token")
            if(logtoken){
                const loginfo = await jwt.verify(logtoken, process.env.NEXT_PUBLIC_APIKEY)

                if(loginfo.email){
                    if(loginfo.setup == 0 && router.pathname !== '/setup'){
                        router.push('/setup')
                        return
                    }
                    return
                }else{
                    router.push('/login') 
                    await jsCookie.remove("token")
                    return
                }

            }else{
                router.push('/login')
                return
            }
        }

        return <Component {...props} />;
    };

    Protected.getInitialProps = async ctx => {
        
        return { thing: true };
    };

    return Protected;
};