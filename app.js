var createError = require('http-errors');
var express = require('express');
// var path = require('path');
let app = express();
const http = require('http').Server(app);
var logger = require('morgan');
const bodyParser = require('body-parser');

var mysql = require('mysql');
 var connection = mysql.createConnection({
   host     : '127.0.0.1',
   user     : 'root',
   password : '123',
   database : 'todo_list'
 });

 connection.query('SELECT * from tasks WHERE 1', function(err, rows, fields) {
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query. ' + err);
 });

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public/javascript'));

app.get('/', (req, res) => {
	res.render('index', {title : 'API' });
})

app.get('/send', (req, res) => {
	res.render('send');
	})

app.post('/send',function(req, res) {
   console.log(req.body);
   	var employee = {task:req.body.task}

    connection.query('INSERT INTO tasks SET ?', employee, function(err,res) {
    	if(err){
        	throw err;
    	}
        else{
        	console.dir(res);
    	}
    })
   res.redirect('/');
   connection.end();
   // res.send(JSON.stringify(req.body));
  
})
    


app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, () => {
	console.log('Go 3000');
})

module.exports = app;
