const Subscribe = require('../../models/subscribe');


const routes = function(app) {
  app.get('/subscription', async (req, res) => {
    try {
      let subscribes = await Subscribe.find();
      res.json(subscribes)
    }catch(err) {
      console.log(err)
      res.send('server error occurs')
    }
  });

  app.post('/subscription', async (req, res) => {
    try {
      let subscribes = new Subscribe(req.body);
      await Subscribe.save();
      res.json({msg:'data saved', code:200})
    }catch(err) {
      res.send('server error occurs')
    }
  });
}
module.exports = routes;