const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const basicAuth = require('express-basic-auth');
const methodOverride = require('method-override');
const Post = require('./models/post.model.js');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

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
// mongoosePort = process.env.LOCAL_DB;
mongoose.connect(mongoosePort, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

app.get('/', (req, res) => {
  Post.find({}).sort('-createdAt').exec((err, posts) => {
    if (!err) {
      res.render('home', { posts });
    }
  });
});

app.get('/blog', (req, res) => {
  Post.find({}).sort('-createdAt').exec((err, posts) => {
    if (!err) {
      res.render('blog', { posts });
    }
  });
});

app.get('/blog/:id', (req, res) => {
  const { id } = req.params;
  Post.findOne({ _id: id }, (err, post) => {
    if (!err && post) {
      res.render('blogpost', { post });
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

app.get('/compose/:id', (req, res) => {
  const { id } = req.params;
  Post.findOne({ _id: id }, (err, post) => {
    res.render('edit', { post });
  });
});
app.delete('/compose/:id', (req, res) => {
  const { id } = req.params;
  Post.findOneAndDelete({ _id: id }, (err) => {
    if (err) res.status(500);
    console.log('post succesfully deleted');
    res.redirect('/');
  });
});
app.put('/compose/:id', (req, res) => {
  const { id } = req.params;
  const { title, lede, content } = req.body;
  Post.findById(id, (err, post) => {
    if (err) res.status(500);
    /* eslint-disable no-param-reassign */
    post.title = title;
    post.lede = lede;
    post.content = content;
    /* eslint-enable no-param-reassign */
    post.save((error) => {
      if (error) res.status(500);
    });
    res.redirect(`/blog/${id}`);
  });
});

app.get('/compose/test/posttemplate', (req, res) => {
  res.render('posttemplate');
});

let port = process.env.PORT;
// port = ''
if (port == null || port === '') {
  port = 3000;
}

app.listen(port, () => {
  console.log('server started successfully');
});
