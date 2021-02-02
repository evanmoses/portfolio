const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const user = process.env.USER;
const pass = process.env.PASS;
function myAuthorizer(username, password) {
  const userMatches = basicAuth.safeCompare(username, user);
  const passwordMatches = basicAuth.safeCompare(password, pass);
  // eslint-disable-next-line no-bitwise
  return userMatches & passwordMatches;
}
// move to get route for addpost
// app.use(basicAuth({ authorizer: myAuthorizer, challenge: true }));

// eslint-disable-next-line prefer-const
let mongoosePort = process.env.CLOUD_DB;
mongoosePort = process.env.LOCAL_DB;
mongoose.connect(mongoosePort, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: {
        locale: 'en',
        strength: 2,
      },
    },
  },
  content: String,
});

const Post = mongoose.model('Post', postSchema);

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (!err) {
      res.render('home', { posts });
    }
  });
});
