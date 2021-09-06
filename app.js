const express = require('express');
const app = express()
const port = 3100;

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'acamica.cjoqmo3tqsxt.us-east-2.rds.amazonaws.com',
    database : 'acamica',
    user     : 'admin',
    password : 'password',
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

app.get('/api', (req, res) => {
	res.send(extract_message())}
);

function extract_message(){
	connection.query('SELECT ms.message FROM messages ms where ms.id == 1' , function (error, result, fields) {
		if (error)
			throw error;

		return result
	});
}

app.listen(port, () => console.log(`Listening on port ${port}!`))
