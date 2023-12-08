const express = require('express');
const app = express()

app.use(express.static(__dirname + '/public'));
var port = 8090;

let buildabears = [ ' Lara', ' Kyle', ' Gwen'];



//http://127.0.0.1:8090/
app.get('/', function(req, resp){
    resp.send('Hello' + buildabears)
});

//http://127.0.0.1:8090/index
app.get('/index', function(req, resp){
    resp.send('Hello Lara')
});

//http://127.0.0.1:8090/users/34/books/8989
app.get('/users/:userId/books/:bookId', function(req, resp){
    resp.send(req.params)
});

//http://127.0.0.1:8090/users/34/books/8989
app.get('/:name&email', function(req, resp){
    resp.send(req.params)
});


//http://127.0.0.1:8090/w?person=Lara
app.get('/w', function(req, resp){
    resp.send(req.query.person)
});

app.post('/new', function(req,resp){
    
    //resp.write
});

app.listen(port)


