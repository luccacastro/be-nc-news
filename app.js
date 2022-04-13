const express = require('express')
const { getTopics } = require('./controllers/topics-controller')
const { findArticlesById, updateArticleById, showArticles} = require('./controllers/articles-controller')
const {getArticleComments, addComment, deleteComment, deleteCommentById} = require('./controllers/comments-controller')
const {getAllUsers} = require('./controllers/users-controller')
const {getEndpoints} = require('./controllers/endpoints-controller')
const {invalidRouteHandler, getServerErrorHandler} = require('./error')

const app = express()

app.use(express.json())

app.get("/api", getEndpoints);
app.get('/api/topics', getTopics)
app.get('/api/articles/:article_id', findArticlesById)
app.patch('/api/articles/:article_id', updateArticleById)
app.get('/api/users', getAllUsers)
app.get('/api/articles/', showArticles)
app.get('/api/articles/:article_id/comments', getArticleComments)
app.post('/api/articles/:article_id/comments', addComment)
app.delete('/api/comment/:comment_id', deleteCommentById)

// app.get('/api/articles', getArticles)

app.all("/*", (req, res) => {
    res.status(404).send({ message: "Path not found" });
  });

app.get('/*', invalidRouteHandler)
app.use(getServerErrorHandler);
// app.use('/*', )


module.exports = app