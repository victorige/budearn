import dbConnect from '../../utils/dbConnect'
import BEPictures from '../../../models/BEPictures';

dbConnect();

const x = require('x-ray-scraper');

export default async function handler(req, res) {
  const { method } = req;
 
  switch  (method) {
    
      case 'GET':
          try{

            const pictures = await BEPictures.findOne({id: 1});

            if (!pictures) {
                return res.status(400).json({ success:false });

            }
                
            return res.status(200).json({ success:true, pictures: pictures.pictures });

              } catch (error) {
                  return res.status(400).json({ success:false, error: error.message });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }