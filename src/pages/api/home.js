import dbConnect from '../../utils/dbConnect'
import BEUsers from '../../../models/BEUsers';
import BEInfos from '../../../models/BEInfos';

var jwt = require('jsonwebtoken');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
            const info = await BEInfos.findOne({id: 1})
            const users = await BEUsers.findOne({email: data.email});

            if (!users) {
                return res.status(400).json({ success: false });
            }

            const refcount = await BEUsers.countDocuments({ referral: users._id });

            return res.status(200).json({ success: true, userid: users._id, balance: users.balance, name: users.name, gender: users.gender, daily: users.daily, page: users.page, status: users.status, share: users.share, shareday: users.shareday, infodaily: info.daily, infoonextdate: info.nextdate, refcount: refcount  });

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }