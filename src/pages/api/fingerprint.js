import dbConnect from '../../utils/dbConnect'
import BEUsers from '../../../models/BEUsers';
import BEFingerprint from '../../../models/BEFingerprints'

var jwt = require('jsonwebtoken');

dbConnect();

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
                
            const fingerprint = await BEFingerprint.findOne({fingerprint: data.fingerprint});

            if (!fingerprint) {
                await BEFingerprint.create({email: data.email, fingerprint: data.fingerprint, time: new Date()});
                    return res.status(200).json({ success: true, allow: 1 });
            }

                    var time = new Date(fingerprint.time);
                    var now = new Date();
                    var seconds = ((now.getTime() - time.getTime()) * .001) >> 0;
                    var minutes = seconds / 60;
                    var hours = minutes / 60;
            

                    if(fingerprint.email.toLocaleLowerCase() !== data.email.toLocaleLowerCase()){

                        if(hours < 24){
                            return res.status(200).json({ success: true, allow: 0 });
                        }

                        var fxt = { fingerprint: data.fingerprint };
                        var bodyy = {email: data.email, time: new Date()}
    
                        await BEFingerprint.findOneAndUpdate(fxt, bodyy, {
                            new: true,
                            runValidators: true
                        });

                        return res.status(200).json({ success: true, allow: 1 });
                    }

                    
    

                    if(hours > 24){
                        var fxt = { fingerprint: data.fingerprint };
                        var bodyy = {time: new Date()}
    
                        await BEFingerprint.findOneAndUpdate(fxt, bodyy, {
                            new: true,
                            runValidators: true
                        });
                        return res.status(200).json({ success: true, allow: 1 });
                    }
    
                    return res.status(200).json({ success: true, allow: 1 });

              } catch (error) {
                  return res.status(400).json({ success:false, error: error.message });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }