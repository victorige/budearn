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
                
            const users = await BEUsers.findOne({email: data.email});

            if (!users) {
                return res.status(200).json({ success: true, email: 0 });
            }

            return res.status(200).json({ success: true, email: 1 });

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }