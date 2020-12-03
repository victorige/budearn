import dbConnect from '../../utils/dbConnect'
import BEPictures from '../../../models/BEPictures';


dbConnect();

const x = require('x-ray-scraper');

export default async function handler(req, res) {
  const { query: { id }, method } = req;

    if(id !== process.env.NEXT_PUBLIC_CRON_PASS){
        return res.status(400).json({ success:false });
    }
 
  switch  (method) {
    
      case 'GET':
          try{

            const pictures = await BEPictures.findOne({id: 1});

            if (!pictures) {
                await BEPictures.create({
                    id: 1, 
                    pictures: []
                });
            }
 
            var photourl = []

             var picture1 = await x('https://www.pornpics.com/recent/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture1.length > 5) picture1.length = 5;
              var photourl = photourl.concat(picture1)
              

              var picture2 = await x('https://www.pornpics.com/recent/pussy/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture2.length > 5) picture2.length = 5;
              var photourl = photourl.concat(picture2)

              var picture3 = await x('https://www.pornpics.com/recent/big-tits/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture3.length > 5) picture3.length = 5;
              var photourl = photourl.concat(picture3)

              var picture4 = await x('https://www.pornpics.com/recent/big-cock/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture4.length > 5) picture4.length = 5;
              var photourl = photourl.concat(picture4)

              var picture5 = await x('https://www.pornpics.com/recent/fingering/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture5.length > 5) picture5.length = 5;
              var photourl = photourl.concat(picture5)

              var picture6 = await x('https://www.pornpics.com/recent/european/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture6.length > 5) picture6.length = 5;
              var photourl = photourl.concat(picture6)

              var picture7 = await x('https://www.pornpics.com/recent/pregnant/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture7.length > 5) picture7.length = 5;
              var photourl = photourl.concat(picture7)

              var picture8 = await x('https://www.pornpics.com/recent/ebony/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture8.length > 5) picture8.length = 5;
              var photourl = photourl.concat(picture8)

              var picture9 = await x('https://www.pornpics.com/recent/bbw/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture9.length > 5) picture9.length = 5;
              var photourl = photourl.concat(picture9)

              var picture10 = await x('https://www.pornpics.com/recent/pornstar/', 'ul li.thumbwook a', [{
                image: 'img@data-src'
              }])

              if (picture10.length > 5) picture10.length = 5;
              var photourl = photourl.concat(picture10)
             

             if(photourl.length >= 50){
                await BEPictures.findOneAndUpdate({id: 1}, {pictures: photourl }, {
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