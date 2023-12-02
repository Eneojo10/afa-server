const express = require('express');
const app = express.Router();

require('./endpoints/registration')(app);
require('./endpoints/general')(app);
require('./endpoints/category')(app);
require('./endpoints/subscribe')(app);
require('./endpoints/kontact')(app);

module.exports = app;
