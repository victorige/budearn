import dbConnect from '../../utils/dbConnect'
import BEInfos from '../../../models/BEInfos';
import BEUsers from '../../../models/BEUsers';

var jwt = require('jsonwebtoken');

dbConnect();


export default async function handler(req, res) {
  const { method } = req;

  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)
 
  switch  (method) {
    
      case 'POST':
          try{

            var infos = await BEInfos.findOne({id: 1});

            if (!infos) {
                await BEInfos.create({
                    id: 1, 
                    daily: 1
                });
            }

            var infos = await BEInfos.findOne({id: 1});

            var user = await BEUsers.findOne({email: data.email});

            

            if(infos.daily !== user.daily){
                var ran = Math.floor(Math.random() * (35 - 15) + 15);
                await BEUsers.findOneAndUpdate({email: data.email}, {daily: infos.daily, adnum: ran, adclick: 0, page: 1, status: 0 }, {
                    new: true,
                    runValidators: true
                });
            }

            var user = await BEUsers.findOne({email: data.email});

            if(user.page > 50 && user.status == 0 && user.adclick ==  1){
                var ball = user.balance + 8
                await BEUsers.findOneAndUpdate({email: data.email}, {status: 1, balance: ball }, {
                    new: true,
                    runValidators: true
                });

                if(user.referral){
                    var ref = await BEUsers.findOne({_id: user.referral});
                    var refball = ref.balance + 0.8
                    await BEUsers.findOneAndUpdate({_id: user.referral}, {balance: refball }, {
                        new: true,
                        runValidators: true
                    });
                }
            }

            var user = await BEUsers.findOne({email: data.email});
   
                
            return res.status(200).json({ success:true, email: user.email, adnum: user.adnum, adclick: user.adclick, page: user.page, status: user.status });

              } catch (error) {
                  return res.status(400).json({ success:false, error: error.message });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }