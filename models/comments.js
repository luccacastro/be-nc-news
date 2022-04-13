const db = require('../db/connection')

exports.getAllComments = (id) =>{
    let commentQtdy = 0
    console.log(commentQtdy)
    return db.query(`SELECT comment_id, votes, created_at, author FROM comments  WHERE article_id = $1 GROUP BY comment_id`, [id])
            .then(resp => {
                if(!resp.rows.length) return Promise.reject({status: 404, message: 'Article has no comments'})
                else return {comments: resp.rows}
            }).catch(err => {
                console.log(err)
                return err
            })
}

exports.addComment = ({article_id, author, body}) =>{
    console.log(author, body, article_id)
    return db.query(`INSERT INTO comments (body, author, article_id, votes, created_at) VALUES ('${body}', '${author}', ${article_id}, 0, NOW());`)
        .then(resp => {
            console.log(resp)
            return {message: 'Comment added successfully!'}
        })
        .catch(err => {
            console.log(err, 'dsfdsfasdf')
            return err
        })
}

exports.removeComment = async (id) => {
    const deleted = await db.query(
      "DELETE FROM comments WHERE comment_id=$1 RETURNING *",
      [id]
    );
    if (deleted.rows[0] === undefined) {
      return Promise.reject({
        status: 404,
        message: "Resource not found",
      });
    }
  };