const { getAllComments, addComment } = require('../models/comments')

exports.getArticleComments = (req,res,next) =>{
    const {article_id} = req.params
    return getAllComments(article_id).then(data => {
        res.send(data)
    }).catch(err => {
        next(err)
    })
}

exports.addComment = (req,res,next) => {
    const commentData = {...req.params, ...req.body}
    console.log(commentData)
    return addComment(commentData).then(data => {
        res.send(data)
    }).catch(err => {
        next(err)
    })
}