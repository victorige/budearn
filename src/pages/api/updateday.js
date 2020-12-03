import dbConnect from '../../utils/dbConnect'
import BEInfos from '../../../models/BEInfos';


dbConnect();


export default async function handler(req, res) {
    const { query: { id }, method } = req;

    if(id !== process.env.NEXT_PUBLIC_CRON_PASS){
        return res.status(400).json({ success:false });
    }
 
  switch  (method) {
    
      case 'GET':
          try{

            let tomorrow = new Date();
            tomorrow.setDate(new Date().getDate()+1);

            const info = await BEInfos.findOne({id: 1})

            await BEInfos.findOneAndUpdate({id: 1}, { daily: info.daily+1, nextdate: tomorrow }, {
                new: true,
                runValidators: true
            });
 
            
               
            
                
            return res.status(200).json({ success:true });

              } catch (error) {
                  return res.status(400).json({ success:false, error: error.message });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }