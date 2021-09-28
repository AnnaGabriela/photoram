const mongoose = require('mongoose');
const { mongoURL } = require('./api');

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });
