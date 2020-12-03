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
             
            var dataid = { email: data.email };

            const insert = await BEUsers.findOneAndUpdate(dataid, {
                password: data.password,
            }, {
                new: true,
                runValidators: true
            });

            if (!insert) {
                return res.status(400).json({ success: false });
            }

            return res.status(200).json({ success: true });

         } catch (error) {
                  return res.status(400).json({ success:false });
        }
        break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }