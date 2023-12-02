const Kontact = require('../../models/kontact')

const routes = function (app) {
  app.get('/contact', async (req, res) => {
    try {
      let contact = await Kontact.find();
      res.json(contact);
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });

  app.post('/contact', async (req, res) => {
    try {
      let contact = new Kontact(req.body);
      await contact.save();
      res.json({ msg: 'data saved', code: 200 });
    } catch (err) {
      res.send('server error occurs');
    }
  });
};
module.exports = routes;