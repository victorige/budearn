import dbConnect from '../../utils/dbConnect'
import BEUsers from '../../../models/BEUsers';

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var generatePassword = require("password-generator");
var elasticemail = require('elasticemail');

dbConnect();

var maxLength = 18;
var minLength = 12;
var uppercaseMinCount = 3;
var lowercaseMinCount = 3;
var numberMinCount = 2;
var specialMinCount = 2;
var UPPERCASE_RE = /([A-Z])/g;
var LOWERCASE_RE = /([a-z])/g;
var NUMBER_RE = /([\d])/g;
var SPECIAL_CHAR_RE = /([\?\-])/g;
var NON_REPEATING_CHAR_RE = /([\w\d\?\-])\1{2,}/g;
 
function isStrongEnough(password) {
  var uc = password.match(UPPERCASE_RE);
  var lc = password.match(LOWERCASE_RE);
  var n = password.match(NUMBER_RE);
  var sc = password.match(SPECIAL_CHAR_RE);
  var nr = password.match(NON_REPEATING_CHAR_RE);
  return password.length >= minLength &&
    !nr &&
    uc && uc.length >= uppercaseMinCount &&
    lc && lc.length >= lowercaseMinCount &&
    n && n.length >= numberMinCount &&
    sc && sc.length >= specialMinCount;
}
 
function customPassword() {
  var password = "";
  var randomLength = Math.floor(Math.random() * (maxLength - minLength)) + minLength;
  while (!isStrongEnough(password)) {
    password = generatePassword(randomLength, false, /[\w\d\?\-]/);
  }
  return password;
}

export default async function handler(req, res) {
  const { method } = req;
  const data = await jwt.verify(req.body.data, process.env.NEXT_PUBLIC_APIKEY)

  switch  (method) {
    
      case 'POST':
          try{
                
            const users = await BEUsers.findOne({email: data.email});

            if (!users) {
                return res.status(200).json({ success: true, email: 0 });
            }

            const newpassword = customPassword()
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(newpassword, salt);
            const encryptpassword = hash

            var client = elasticemail.createClient({
                username: process.env.NEXT_PUBLIC_ELASTIC_API_KEY,
                apiKey: process.env.NEXT_PUBLIC_ELASTIC_API_KEY
                });

                var msg = {
                    from: process.env.NEXT_PUBLIC_MAIL_FROM,
                    from_name: process.env.NEXT_PUBLIC_TITLE,
                    to: data.email,
                    subject: process.env.NEXT_PUBLIC_TITLE + ' Password Reset',
                    body_html: "<div> <p>Hello, "+data.email+"</p> <p>Use this password to login into your account.</p><br/> <p><b>New Password: "+newpassword+"</b></p> <br/> <p>We recommend you to change this password.</p> <p>Thanks, Team "+process.env.NEXT_PUBLIC_TITLE+" :)</p> </div>"
                    };

                await client.mailer.send(msg, function(err, result) {});

                await BEUsers.findOneAndUpdate({email: data.email}, {
                    password: encryptpassword,
                }, {
                    new: true,
                    runValidators: true
                });



                return res.status(200).json({ success: true, email: 1 });

              } catch (error) {
                  return res.status(400).json({ success:false });
              }
              break;
  
      default:
          return res.status(400).json({ success:false });
          break;

  }
  }