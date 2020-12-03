import dbConnect from '../../utils/dbConnect'
import BEWithdraws from '../../../models/BEWithdraws';


dbConnect();


export default async function handler(req, res) {
    const { query: { id }, method } = req;

    if(id !== process.env.NEXT_PUBLIC_CRON_PASS){
        return res.status(400).json({ success:false });
    }
 
  switch  (method) {
    
      case 'GET':
          try{

            const withdraw = await BEWithdraws.find({status: 0}).sort({ _id: 'asc' }).limit(1);

            
            var time = new Date(withdraw[0].date);
            var now = new Date();
            var seconds = ((now.getTime() - time.getTime()) * .001) >> 0;
            var minutes = seconds / 60;
            var hour = minutes / 60;
            var day = hour / 24;
            

            if(day >= 5){
                await BEWithdraws.findOneAndUpdate({_id: withdraw[0]._id}, { status: 1 }, {
                    new: true,
                    runValidators: true
                });
            }

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