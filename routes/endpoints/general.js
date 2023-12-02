const General = require('../../models/general');
const Category = require('../../models/category');

const multer = require('multer');
const path = require('path');
const Config = require('../../config.json');
const FILE_PATH = Config.MODE.toUpperCase() == 'PROD' ? Config.ONLINE_URL : Config.LOCAL_URL;
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
  app.post('/posts/form', avatar, async (req, res) => {
    try {
      let general = new General(req.body);

      if (req.file) {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        let dataURI = 'data:' + req.file.mimetype + ';base64,' + b64;
        const data = await handleUpload(dataURI);

        general.avatar = data.url;
        await general.save();
        res.json({ msg: 'data saved', code: 200 });
      } else {
        res.json({
          msg: 'Post cannot be saved without image',
          code: 400,
        });
      }
    } catch (err) {
      console.log(err.message);
      res.send('server error occurs');
    }
  });


  app.post('/posts', async (req, res) => {
    try {
      let general = new General(req.body);

      await general.save();
      res.json({ msg: 'Post created', code: 200 });
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });

  app.get('/posts', async (req, res) => {
    try {
      let general = await General.find();
      res.json(general);
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });

  app.get('/posts/recent', async (req, res) => {
    try {
      let posts = (await General.find().sort({ createdAt: -1 }))[0];
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });

  app.get('/posts/:id', async (req, res) => {
    try {
      let posts = await General.findById(req.params.id);
      res.json(posts);
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });


  app.get('/posts/:category/name', async (req, res) => {
    try {
      const categoryTitle = req.params.category;

      const category = await Category.findOne({ title: categoryTitle });

      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }

      const posts = await General.find({ category_id: category._id }).populate(
        'category_id'
      );

      res.json(posts);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Server error occurs' });
    }
  });

  app.put('/posts/:id', async (req, res) => {
    try {
      let post = await General.findOne({ _id: req.params.id });

      if (!post) return res.json({ msg: 'post does not exist' });
      if (req.body) {
        post.overwrite({ ...post._doc, ...req.body });
      }

      await post.save();
      res.json({ msg: 'post updated', code: 200 });
    } catch (err) {
      console.log(err);
      res.send('server error occurs');
    }
  });

  app.delete('/posts/:id', async (req, res) => {
    try {
      await Post.deleteOne({ _id: req.params.id });
      res.json({ msg: 'Post deleted!!!', code: 200 });
    } catch (err) {
      res.status(500).send(err);
    }
  });

};

module.exports = routes;