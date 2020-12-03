import dbConnect from '../../utils/dbConnect'
import BEUsers from '../../../models/BEUsers';
import BEWithdraws from '../../../models/BEWithdraws';

var jwt = require('jsonwebtoken');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
             
            var dataid = await BEUsers.findOne({ email: data.email });

            if (dataid) {
                if(dataid.balance >= 300){
                    await BEUsers.findOneAndUpdate({email: dataid.email}, {
                        balance: 0,
                    }, {
                        new: true,
                        runValidators: true
                    });

                    await BEWithdraws.create({
                        user: data.email, 
                        btcaddress: data.btcaddress,
                        amount: dataid.balance,
                        status: 0
                    });
                    return res.status(200).json({ success: true, withdraw: 1, amount: dataid.balance });
                }else{
                    return res.status(200).json({ success: true, withdraw: 2  });
                }

            }

            return res.status(400).json({ success: false });

         } catch (error) {
                  return res.status(400).json({ success:false });
        }
        break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }