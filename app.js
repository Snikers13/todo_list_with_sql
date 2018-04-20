const createError = require('http-errors');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const connection = require('express-myconnection');
const logger = require('morgan');
const bodyParser = require('body-parser');

//const routes = require('./routes');

const todo = require('./routes/todo_routes');

app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + '/public/javascript'));

app.use(bodyParser.json());

const mysql = require('mysql');

app.use(connection(mysql, {
   host     : '127.0.0.1',
   user     : 'root',
   password : '',
   database : 'todo_list'
 }, 'pool')
);

app.get('/', todo.all);
app.post('/', todo.add);

app.use( (req, res, next) => {
  next(createError(404));
});

// connection.query('SELECT * from tasks WHERE 1', (err, rows, fields) => {
//    if (!err)
//      console.log('The solution is: ', rows);
//    else
//      console.log('Error while performing Query. ' + err);
//  });





//in ROUTES
// app.get('/', (req, res) => {
//     connection.query('SELECT task FROM tasks', function(err, rows, fields) {
//           let a = JSON.stringify(rows);
//           let data = JSON.parse(a);
//           res.render('index', {title: 'todo', person: a})

//     })
   

// });




// app.post('/', (req, res) => {
//   console.log(req.body);
//   var employee = {task:req.body.task}

//     connection.query('INSERT INTO tasks SET ?', employee, (err,res) => {
//       if(err){
//         	throw err;
//     	}
//         else{
//         	console.dir(res);
//     	}
//     });
//    	res.redirect('/');
// //    connection.end(function(err) {
// //   // The connection is terminated now
// // });
//    // connection.destroy();
//       // res.send(JSON.stringify(req.body));
  
// })
    




// error handler
app.use( (err, req, res, next) => {
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
