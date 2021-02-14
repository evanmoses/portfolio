const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
const Post = require('./models/post.model.js');
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

app.use('/compose', basicAuth({ authorizer: myAuthorizer, challenge: true }));

// eslint-disable-next-line prefer-const
let mongoosePort = process.env.CLOUD_DB;
mongoosePort = process.env.LOCAL_DB;
mongoose.connect(mongoosePort, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.get('/', (req, res) => {
  Post.find({}, (err, posts) => {
    if (!err) {
      res.render('home', { posts });
    }
  });
});

app.route('/compose')
  .get((req, res) => {
    res.render('compose');
  })
  .post((req, res) => {
    const { title, lede, content } = req.body;
    const newPost = new Post({
      title, lede, content,
    });
    newPost.save();
    res.redirect('/');
  });

let port = process.env.PORT;
// port = ''
if (port == null || port === '') {
  port = 3000;
}

app.listen(port, () => {
  console.log('server started successfully');
});
