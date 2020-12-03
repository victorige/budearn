import dbConnect from '../../utils/dbConnect'
import BEUsers from '../../../models/BEUsers';

var jwt = require('jsonwebtoken');

var bcrypt = require('bcryptjs');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
             
                const user = await BEUsers.findOne({ email: data.email });

                if (!user) {
                    return res.status(200).json({ success:true, match: 0 });
                }

                const passcom = await bcrypt.compareSync(data.password, user.password);

                if(!passcom){
                    return res.status(200).json({ success:true, match: 0 });
                }

                var dataid = { email: data.email };

                const users = await BEUsers.findOneAndUpdate(dataid, { ip: data.ip  }, {
                    new: true,
                    runValidators: true
                });

                return res.status(200).json({ success: true, match: 1, setup: users.setup })

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }