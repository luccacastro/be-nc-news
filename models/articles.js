const db = require('../db/connection')



exports.getAllArticles = ({topic, sort_by, order=''}) => {
    console.log(topic, sort_by, order)
    const queryOrder = order.toUpperCase() =='ASC'? 'ASC' : 'DESC'
    const queryTopic = topic? `WHERE topic='${topic}'`: ''
    const querySortBy = order? `ORDER BY ${sort_by} ${queryOrder}`: '' 
    console.log(queryTopic)
    return db.query(`SELECT * FROM articles ${queryTopic} ${querySortBy}`)
    .then(resp => resp.rows)
}

exports.getArticlesById = (id) => {
    return db.query(`SELECT *, (SELECT COUNT(*) FROM comments WHERE article_id = $1) AS comment_count FROM articles WHERE article_id = $1 `, [id])
            .then(resp => {
                if(!resp.rows.length) return Promise.reject({status: 404, message: '404 article not found  valid number but non existent article'})
                else return resp.rows[0]
            })
}

exports.articleUpdate = (id, articleData) => {
    let valuesList = Object.keys(articleData).map(key => `${key}='${articleData[key]}'`).join(', ')
    console.log(valuesList)
    return db.query(`UPDATE articles SET ${valuesList} WHERE article_id = $1`, [id])
            .then(resp => resp.rows)
            .catch(err => console.log(err))
}

