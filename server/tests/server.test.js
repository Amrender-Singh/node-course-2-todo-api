const {ObjectID} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
//test data
var objectId = new ObjectID();
const todos = [{
    _id : objectId,
    text : "First test todo"
},{
    text : "Second test todo"
}];
beforeEach((done)=>{
    Todo.remove({}).then(()=>{
       return Todo.insertMany(todos);
    }).then(()=>done());
});

describe('Post /todos', ()=>{
    it('Should create a new Todo', (done)=>{
        var text = "test todo test";
        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res)=>{
            expect(res.body.text).toBe(text);
        }).end((err,res)=>{
            if(err)
                return done(err);
            Todo.find({text}).then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>done(e));
        });
    });
    it('Should not create a Todo with bad data', (done)=>{
        request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
            if(err)
                return done(err);
            Todo.find().then((todos)=>{
                expect(todos.length).toBe(2);
                done();
            }).catch((e)=>done(e));
        });
    });
});
describe('get /todos', ()=>{
    it('Should get all Todos', (done)=>{
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        }).end(done);
    });
});
describe('get /todos:id', ()=>{
    it('Should get  Todos with given id', (done)=>{
        request(app)
        .get(`/todos/${objectId.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        }).end(done);
    });
    it('Should return 404 if Todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('Should return 404 if not valid Object Id', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .get('/todos/123abcd')
        .expect(404)
        .end(done);
    });
});
describe('delete /todos:id', ()=>{
    it('Should get  Todos with given id', (done)=>{
        request(app)
        .delete(`/todos/${objectId.toHexString()}`)
        .expect(200)
        .end((err, res)=>{
            if(err){
                return done(err);
            }
            Todo.findById(objectId).then((todo)=>{
                expect(todo).toNotExist();
                done();
            }).catch((e)=>done(e));
        });
    });
    it('Should return 404 if Todo not found', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done)
    });
    it('Should return 404 if not valid Object Id', (done)=>{
        var hexId = new ObjectID().toHexString();
        request(app)
        .delete('/todos/123abcd')
        .expect(404)
        .end(done);
    });
});