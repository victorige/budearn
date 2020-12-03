import dbConnect from '../../utils/dbConnect'
import BEPayments from '../../../models/BEPayments';

var jwt = require('jsonwebtoken');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
   
            const paymentscount = await BEPayments.countDocuments();
            if(paymentscount !== 0){
                const payments =  await BEPayments.find().sort({ _id: 'desc' });
                return res.status(200).json({ success: true, count: 1, payments: payments})
            }else{
                return res.status(200).json({ success: true, count: 0 })
            }

            

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }