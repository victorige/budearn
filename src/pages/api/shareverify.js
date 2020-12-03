import dbConnect from '../../utils/dbConnect'
import BEInfos from '../../../models/BEInfos';
import BEUsers from '../../../models/BEUsers';
import axios from "axios";

var jwt = require('jsonwebtoken');

dbConnect();


export default async function handler(req, res) {
  const { method } = req;

  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)
 
  switch  (method) {
    
      case 'POST':
          try{

                const user = await BEUsers.findOne({email: data.email})
                const infos = await BEInfos.findOne({id: 1});

                

                if(user.share !== null && user.shareday !== infos.daily){
                    const fbshare = await axios.get("https://graph.facebook.com/v3.3/?id=" + process.env.NEXT_PUBLIC_SHAREURL + "?s="+ user.share + "&fields=engagement&access_token="+ process.env.NEXT_PUBLIC_FBACCESSTOKEN);
                    if(fbshare.data.engagement.share_count > 0){
                        var ball = user.balance + 2
                        await BEUsers.findOneAndUpdate({email: data.email}, {balance: ball, share: null, shareday: infos.daily }, {
                            new: true,
                            runValidators: true
                        });
                        return res.status(200).json({ success:true });
                    }
         
                   
                }

                    
                
            return res.status(400).json({ success:false });

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }