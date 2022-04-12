const { getArticlesById, articleUpdate, getAllArticles, getAllComments } = require('../models/articles')

exports.findArticlesById = (req,res, next) => {
    const {article_id} = req.params
    if(!/[1-9]/.test(article_id)){
       return res.status(400).send({message: "400 - bad request article_id is not a number"})
    }
    return getArticlesById(article_id).then(data => {
        res.send(data)
    }).catch(err => {
        next(err)
    })
}

exports.showArticles = (req,res,next) =>{
    // const {topic, sort_by, order} = 
    return getAllArticles(req.query).then(data => {
        res.send(data)
    }).catch(err => {
        next(err)
    })
}

exports.updateArticleById = (req,res,next) => {
    const {article_id} = req.params
    // console.log()
    return articleUpdate(article_id, req.params).then(data => {
        res.send({message: `Article with id ${article_id} has been updated successfully!`})
    }).catch(err => {
        next(err)
    })
}

exports.getArticleComments = (req,res,next) => {

}