var Todo = require('./models/todo');
var Food = require('./models/food');

function getTodos(res) {
    Todo.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
}
;

function getFood(res) {
    Food.find(function (err, foods) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(foods); // return all todos in JSON format
    });
}
;

function getFoodTotal(res){
    Food.find(function(err, foods)
    {
        var total = 0;
        for(var i in foods)
        {
            total += parseFloat(foods[i].price);
        }
        res.json(total);
    }
        );
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all todos
    app.get('/api/todos', function (req, res) {
        // use mongoose to get all todos in the database
        getTodos(res);
    });


app.get('/api/food', function (req, res) {
        // use mongoose to get all todos in the database
        //var htmlbody = __dirname + '/public/index.html';

        getFood(res);
        //res.sendFile(__dirname + '/public/index.html'); 
    });
    

app.get('/api/total', function (req, res) {
        // use mongoose to get all todos in the database
        getFoodTotal(res);
    });

app.post('/api/food', function (req, res) {
        // create a todo, information comes from AJAX request from Angular
        Food.create({
            item: req.body.item,
            price: req.body.price,
            done: false
        }, function (err, food) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFood(res);
        });

    });

 app.delete('/api/food/:food_id', function (req, res) {
        Food.remove({
            _id: req.params.food_id
        }, function (err, food) {
            if (err)
                res.send(err);

            getFood(res);
        });
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {

        // create a todo, information comes from AJAX request from Angular
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getTodos(res);
        });

    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req,  res) {
        res.sendFile(__dirname + '/public/indexFood.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};