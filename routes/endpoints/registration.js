const Registration = require('../../models/registration');


const multer = require('multer');
const path = require('path');
const Config = require('../../config.json');

const FILE_PATH =
  Config.MODE.toUpperCase() == 'PROD' ? Config.ONLINE_URL : Config.LOCAL_URL;
var cloudinary = require('cloudinary').v2;

async function handleUpload(file) {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: 'auto',
  });
  return res;
}

cloudinary.config({
  cloud_name: 'dsr7fgsfi',
  api_key: '476945147655376',
  api_secret: 'SZtX0-BGtAEIGE5_FyAsXmTtT0Q',
  secure: true,
});

const avatar = multer({ storage: multer.memoryStorage() }).single('avatar');


const routes = function (app) {
  
  app.get('/register', async (req, res) => {
    try {
      let registers = await Registration.find();
      res.json(registers);
    }catch(err) {
      console.log(err)
      res.send('server error occurs')
    }
  });

  app.post('/register', avatar, async (req, res) => {
    try {
      let registers = new Registration(req.body);

      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const data = await handleUpload(dataURI);

        registers.avatar = data.url;
        await registers.save();
        res.json({ msg: 'data saved', code: 200 });
      } else {
        res.json({
          msg: 'unable to save register',
          code: 400,
        });
      }
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });
}

module.exports = routes;