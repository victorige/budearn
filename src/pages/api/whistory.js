import dbConnect from '../../utils/dbConnect'
import BEWithdraws from '../../../models/BEWithdraws';

var jwt = require('jsonwebtoken');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
   
            const withdrawcount = await BEWithdraws.countDocuments({ user: data.email });
            if(withdrawcount !== 0){
                const whistory =  await BEWithdraws.find({ user: data.email }).sort({ _id: 'desc' }).limit(10);
                return res.status(200).json({ success: true, count: 1, history: whistory})
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