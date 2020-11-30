let bodyParser = require('body-parser');
let mongoose = require('mongoose');

//let data = [{item:'get milk'}, {item:'walk dog'}, {item:'play basketball'}];
let urlBodyParser = bodyParser.urlencoded({extended: false});

//Connect to db
mongoose.connect('mongodb+srv://test:test@cluster0.0lpae.mongodb.net/todo?retryWrites=true&w=majority');

//Create a schema
let todoSchema = new mongoose.Schema({
    item : String
});

let Todo = mongoose.model('Todo', todoSchema);
let itemOne = Todo({item : 'football'}).save(function(err){
    if (err) throw err;
    console.log('saved');
})

module.exports = function(app){

    app.get('/todo', function(req, res){
        //add
        Todo.find({}, function(err, data){
            if (err) throw err;
            res.render('todo', {todos:data});
        });
        
    });

    app.post('/todo', urlBodyParser, function(req, res){
        //get data from view, add
        let newTodo = Todo(req.body).save(function(err, data){
            if (err) throw err;
            res.json(data);
        })
        
        
    });

    app.delete('/todo/:item', function(req, res){
        //delete from db
        Todo.find({item:req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
            if (err) throw err;
            res.json(data);
        })

        
    });
};