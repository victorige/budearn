import dbConnect from '../../utils/dbConnect'
import BEPayments from '../../../models/BEPayments';
import axios from "axios";
var random = require('random-name')

dbConnect();

function converter(value, usd){
    const multiplier = 0.00000001
    const btctousd = (value * multiplier) * usd
    return btctousd
}

export default async function handler(req, res) {
  const { query: { id }, method } = req;

    if(id !== process.env.NEXT_PUBLIC_CRON_PASS){
        return res.status(400).json({ success:false });
    }

  
 
  switch  (method) {
    
      case 'GET':
          try{
            
            var btcdata = []

            try {
                const usdquery = await axios.get("https://blockchain.info/ticker");

                if(usdquery.data.USD.last){
                    const usdprice = usdquery.data.USD.last

                    try {
                        const unconfirmed = await axios.get("https://blockchain.info/unconfirmed-transactions?format=json");
                        if(unconfirmed.data.txs){
                            const txs = unconfirmed.data.txs
                            
                            var i = 0
                            for (i = 0; i < txs.length; i++) {
                                var hash  = txs[i].hash
                                var out = txs[i].out
                                var o = 0
                                for (o = 0; o < out.length; o++) {
                                    var fprice = converter(out[o].value, usdprice) 
                                    if(fprice > 300 && fprice < 1000){
                                        var btcdataa = {name: random.first(), hash: hash, addr: out[o].addr, value: out[o].value * 0.00000001, price: fprice, script: out[o].script  }
                                        
                                        var checkpay = await BEPayments.find();

                                        var checkifex = await BEPayments.findOne({script: out[o].script});
                                        if(!checkifex){
                                            if(checkpay.length >= 30){
                                                await BEPayments.deleteOne().sort({ _id: 'asc' }).limit(1)
                                                await BEPayments.create(btcdataa);
                                            }else{
                                                await BEPayments.create(btcdataa);
                                            }

                                            
                                            return res.status(200).json({ success:true })
                                            
                                    }
                                    }
                            } 
                            } 


                            return res.status(200).json({ success:true, data: 'empty'})
                        }
                        return res.status(400).json({ success:false })
                    }catch(error){
                        return res.status(400).json({ success:false, error: error.message })
                    }


                    //return res.status(200).json({ success:true, cc: converter(18045455,usdprice) });

                }

                return res.status(400).json({ success:false })
                
                
                
              } catch (error) {
                return res.status(400).json({ success:false, error: error.message })
              }

        


              } catch (error) {
                  return res.status(400).json({ success:false, error: error.message });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }