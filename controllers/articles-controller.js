const { sort } = require('../db/data/test-data/articles')
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
    const {topic, sort_by, order} = req.params
    return getAllArticles(req.query, topic, sort_by, order).then(data => {
        res.send({articles: data})
    }).catch(err => {
        next(err)
    })
}

exports.updateArticleById = (req,res,next) => {
    const {article_id} = req.params
    console.log(req.body)
    if(!/[1-9]/.test(article_id)){
        return res.status(400).send({message: "400 - bad request article_id is not a number"})
    }
    return articleUpdate(article_id, req.body).then(data => {
        console.log(data)
        res.send({message: `Article with id ${article_id} has been updated successfully!`})
    }).catch(err => {
        // console.log(err.code)
        next(err)
    })
}

exports.getArticleComments = (req,res,next) => {

}


