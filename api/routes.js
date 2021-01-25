const indexRouter = require('./routes/index')
const articlesRouter = require('./routes/articles')

module.exports = (app) => {
  app.use('/', indexRouter);
  app.use('/articles', articlesRouter);
}
