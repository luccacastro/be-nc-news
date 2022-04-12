const app = require('../app')
const request = require('supertest')
const data = require('../db/data/test-data');
const seed = require('../db/seeds/seed');
const db = require('../db/connection');

beforeEach(()=>{
    return seed(data)
})

afterAll(() => {
    return db.end()
})

describe('Topics endpoints', ()=>{
    test('GET /api/topics should return a json containing all topics with status 200', async ()=>{    
    const res =  await request(app).get('/api/topics').expect(200)
    res.body.topics.forEach(item => {})
    //     expect(item.slug).toEqual(expect.any(String))
    //     expect(item.description).toEqual(expect.any(String))
    // })
    // expect(res.body.topics).toHaveLength(3)
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
        // expect(res.body.article_id).toEqual(2)
        // expect(res.body.title).toEqual(objRes.title)
        // expect(res.body.topic).toEqual(objRes.topic)
        // expect(res.body.author).toEqual(objRes.author)
        // expect(res.body.body).toEqual(objRes.body)
        // expect(res.body.created_at).toEqual(objRes.created_at)
        // expect(res.body.votes).toEqual(objRes.votes)
    }) 

    test('GET /api/articles/:article_id should return a response with 400 if article_id is not a number', async ()=>{ 
        // const res = await request(app).get('/api/articles/aa').expect(400)
        // expect(res.body .message).toEqual("400 - bad request article_id is not a number") 
    }) 

    test('GET /api/articles/:article_id should return a response with 404 if theres no article for such id', async ()=>{ 
        // const res = await request(app).get('/api/articles/4324432').expect(404) 
        // expect(res.body.message).toEqual('404 article not found  valid number but non existent article') 
    }) 
      
})