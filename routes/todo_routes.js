module.exports.all = (req, res) => {
	req.getConnection((err, connection) => {
    	connection.query('SELECT * FROM tasks', function(err, rows, fields) {
          let a = JSON.stringify(rows);
          let b = JSON.parse(a);
          console.log(b);
          res.render('index', {title: 'todo', person: rows})
    })

   })
}

module.exports.add = (req, res) => {
	req.getConnection((err, connection) => {
		var employee = {
			task: req.body.task
		}
 		connection.query('INSERT INTO tasks SET ?', [employee], (err,res) => {
     		if(err){
        		throw err;
    		}
        	else {
        		console.dir(res);
    		}
    	});
   	res.redirect('/');

   })
}
