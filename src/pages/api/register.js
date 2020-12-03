import dbConnect from '../../utils/dbConnect'
import BEUsers from '../../../models/BEUsers';

var jwt = require('jsonwebtoken');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{

            
            if(data.referral){
                const idd = await BEUsers.findOne({_id: data.referral});

                
                if(idd){
                    
                    await BEUsers.create({
                        email: data.email, 
                        password: data.password,
                        ip: data.ip,
                        referral: data.referral,
                        token: data.token,
                        setup: data.setup
                    });
                    return res.status(200).json({ success: true })
                }
                
                
                
            }
            
           

                await BEUsers.create({
                    email: data.email, 
                    password: data.password,
                    ip: data.ip,
                    referral: null,
                    token: data.token,
                    setup: data.setup
                });
           
             
                

                return res.status(200).json({ success: true })

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }