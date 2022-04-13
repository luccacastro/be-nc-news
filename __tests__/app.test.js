const app = require('../app')
const request = require('supertest')
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');
const connection = require("../db/connection");


beforeEach(()=>{
    return seed(data)
})

afterAll(() => {
    return db.end()
})

describe('App endpoints', ()=>{

    test("Status 200 - Responds with a JSON description of all endpoints", () => {
        return request(app)
          .get("/api")
          .expect(200)
          .then(({ body: { endpoints } }) => {
            expect(endpoints).toEqual(
              expect.objectContaining({
                "GET /api": expect.any(Object),
                "GET /api/topics": expect.any(Object),
                "GET /api/users": expect.any(Object),
                "GET /api/articles": expect.any(Object),
                "GET /api/articles/:article_id": expect.any(Object),
                "PATCH /api/articles/:article_id": expect.any(Object),
                "GET /api/articles/:article_id/comments": expect.any(Object),
                "POST /api/articles/:article_id/comments": expect.any(Object),
                "DELETE /api/comments/:comment_id": expect.any(Object),
              })
            );
          });
      });

    test("Status 404 - Path not found ", () => {
        return request(app)
          .get("/api/invalid-endpoint")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toEqual("Path not found");
          });
    });

    test('GET /api/topics should return a json containing all topics with status 200', async ()=>{    
    const res =  await request(app).get('/api/topics').expect(200)
        res.body.topics.forEach(item => {
            expect(item.slug).toEqual(expect.any(String))
            expect(item.description).toEqual(expect.any(String))
            
        })
        expect(res.body.topics).toHaveLength(3)
    })

    

    test('GET /api/articles/:articles_id should return a response with 200 OK status', async ()=>{ 
        const objRes = {
            title: "Sony Vaio; or, The Laptop",
            topic: "mitch",
            author: "icellusedkars",
            body: "Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.",
            created_at: "2020-10-16T05:03:00.000Z",
            votes: 0,
        }
        const res = await request(app).get('/api/articles/2').expect(200)
        expect(res.body.article_id).toEqual(2)
        expect(res.body.title).toEqual(objRes.title)
        expect(res.body.topic).toEqual(objRes.topic)
        expect(res.body.author).toEqual(objRes.author)
        expect(res.body.body).toEqual(objRes.body)
        expect(res.body.created_at).toEqual(objRes.created_at)
        expect(res.body.votes).toEqual(objRes.votes)
    }) 

    test('GET /api/articles/:article_id should return a response with 400 if article_id is not a number', async ()=>{ 
        const res = await request(app).get('/api/articles/aa').expect(400)
        expect(res.body .message).toEqual("400 - bad request article_id is not a number") 
    }) 

    test('GET /api/articles/:article_id should return a response with 404 if theres no article for such id', async ()=>{ 
        const res = await request(app).get('/api/articles/4324432').expect(404) 
        expect(res.body.message).toEqual('404 article not found  valid number but non existent article') 
    }) 

    test('GET /api/articles/:article_id should return a response with 404 if theres no article for such id', async ()=>{ 
        const res = await request(app).get('/api/articles/4324432').expect(404) 
        expect(res.body.message).toEqual('404 article not found  valid number but non existent article') 
    }) 

    test('PATCH /api/articles/:article_id should return a json response 4 if given a integer id', ()=>{
        let new_obj = {
            "title": "some projects",
            "topic": "cooking",
            "author": "jesser",
            "body": "This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681."
        }
        return request(app)
        .patch('/api/articles/3')
        .send({body: 'Hello there'})
        .then(({res}) => {
            res = JSON.parse(res.text)
            expect(res.message).toEqual("Article with id 3 has been updated successfully!")
            return request(app).get('/api/articles/3412323')
        
        })
    })
    
    test('PATCH /api/articles/:article_id should return a 404 message if updated author does not exist ', ()=>{
        return request(app)
        .patch('/api/articles/4')
        .send({author: 'randomauthor'})
        .then((res) => {
            res = JSON.parse(res.text)
            expect(res.message).toEqual("author does not exist")
        })  
    })

    test("GET api/users- Responds with an array of users of expected length", () => {
        return request(app)
          .get("/api/users")
          .then(({ body: { users } }) => {
            expect(users).toHaveLength(4);
          });
      });
    
    test("GET api/users- Responds with an array of users of expected length", () => {
    return request(app)
        .get("/api/users")
        .then(({ body: { users } }) => {
        expect(users).toHaveLength(4);
        });
    });

    test("GET  /api/articles/- Responds with an array of users of expected length", () => {
        return request(app)
        .get("/api/articles")
        .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(12);
        });
    });

    test("GET  /api/articles/- Responds with an array of articles of expected length", () => {
        return request(app)
        .get("/api/articles")
        .then(({ body: { articles } }) => {
        expect(articles).toHaveLength(12);
        });
    });

    test("GET  /api/articles/- Responds with an array of articles with topic parameter of expected length", () => {
        return request(app)
        .get("/api/articles")
        .query({topic: "mitch"})
        .then(({body : { articles }}) => {
            // console.log(body)
            expect(articles).toHaveLength(11);
        });
    });

    test("GET  /api/articles/- Responds with an sorted array of articles by article_id with  parameter of expected length", () => {
        return request(app)
        .get("/api/articles")
        .query({sort_by: "article_id", order: 'desc'})
        .then(({ body : {articles} }) => {
            // console.log(articles)
            expect(articles[0].article_id).toEqual(12);
        });
    });

    test("GET  /api/articles/article:id/comments- Responds with an array of comments for a given article", () => {
        return request(app)
        .get("/api/articles/1/comments")
        .then(({ body : {comments} }) => {
            expect(comments).toHaveLength(11);
        });
    });

    test("GET  /api/articles/article:id/comments- Returns 404 if article has no comments", () => {
        return request(app)
        .get("/api/articles/10/comments")
        .then(({ body }) => {
          
            expect(body.message).toEqual('Article has no comments');
        });
    });

    test("GET  /api/articles/article:id/comments- Returns 404 if article has no comments", () => {
        return request(app)
        .get("/api/articles/10/comments")
        .then(({ body }) => {
          
            expect(body.message).toEqual('Article has no comments');
        });
    });

    test("DELETE /api/comments/:comment_id - Returns 200 if comment is sucessfully deleted", ()=>{
        return request(app)
        .delete("/api/comment/3")
        .then(({ body }) => {
            return connection.query(
                "SELECT * FROM comments WHERE comment_id =3;"
            );
            
        }).then((comments) => {
          expect(comments.rows[0]).toBe(undefined);
        });
    })

    test("DELETE /api/comments/:comment_id - Returns 404 if comment does not exist", ()=>{
        return request(app)
        .delete("/api/comment/320")
        .then(({ body }) => {
            expect(body.message).toBe("Resource not found");
        })
    })

    test("POST /api/articles/:article_id/comments - Returns 200 if ", ()=>{
        const newComment = {
        author: "lurker",
        body: "What is this internet?",
      };
        return request(app).post("/api/articles/2/comments")
        .send(newComment)
        .then(({ body }) => {
            console.log(body)
            return connection.query(`SELECT * FROM comments WHERE body='${newComment.body}';`);
        }).then((comment)=>{
            expect(comment.rows[0].author).toEqual('lurker')
        })
    })

    // test("GET  /api/articles/- Responds with an array of articles with topic parameter of expected length", () => {
    //     return request(app)
    //     .get("/api/articles")
    //     .query({order: "asc"})
    //     .then(({ body }) => {
    //         console.log(body)
    //     });
    // });

    // test("GET  /api/articles/- Responds with an sorted array of articles of expected length", () => {
    //     return request(app)
    //     .get("/api/articles")
    //     .query({order: "asc"})
    //     .then(({ body }) => {
    //         console.log(body)
    //     });
    // });
})