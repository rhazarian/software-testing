const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

users = {
  "system": {
    id: 0,
    username: "system",
    password: "admin" // the most secure password
  },
  "admin": {
    id: 1,
    username: "admin",
    password: "password" // even better
  }
}

const auth = basicAuth({
  authorizer: (username, password) => users[username] && basicAuth.safeCompare(password, users[username].password)
});

module.exports = (app) => {
  app.post('/auth', bodyParser.json(), (req, res) => {
    const credentials = {
      username: req.body.username,
      password: req.body.password
    };

    console.log(credentials);

    const data = users[credentials.username];
    if (data && basicAuth.safeCompare(credentials.password, data.password)) {
      res.json(data);
      return;
    }

    res.sendStatus(401);
  });
  app.use('/articles', auth, articlesRouter);
  app.use('/', auth, indexRouter);
}
