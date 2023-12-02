const Category = require('../../models/category');

const routes = function (app) {
  app.get('/categories', async (req, res) => {
    try {
      let categories = await Category.find();
      res.json(categories);
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });

  app.post('/categories', async (req, res) => {
    try {
      let categories = new Category(req.body);
      await categories.save();
      res.json({ msg: 'data saved', code: 200 });
    } catch (err) {
      res.send('server error occurs');
    }
  });
};
module.exports = routes;
