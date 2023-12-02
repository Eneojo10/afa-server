const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const routes = require('./routes/route.index');

const URL ='mongodb+srv://sundayameh150:2JvLCiLsJYmrVrE1@cluster0.vuwsg8s.mongodb.net/afa';
// const URL = 'mongodb://localhost:27017/afa';
const PORT = 5008;

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB Connected');
});

app.use(cors());
app.use(express.json());
// app.use('/avatar', express.static(path.join(__dirname,'avatars')))
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.get('/', function (req, res) {
  res.send({ msg: 'Our API record' });
});

app.listen(PORT, () => {
  console.log('Running on http://localhost:' + PORT);
});
