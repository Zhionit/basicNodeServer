const express = require('express');
const app = express()
const port = 3100;

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'acamica.cjoqmo3tqsxt.us-east-2.rds.amazonaws.com',
    database : 'Acamica',
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
	res.send(extract_message())
});

function extract_message(){
	return connection.query('SELECT ms.message FROM messages ms where ms.id = 1' , function (error, result, fields) {
		if (error) {
			console.log(error);
			throw error;
		}

		console.log(result[0].RowDataPacket);
		return result[0].RowDataPacket.message;
	});
}

app.listen(port, () => console.log(`Listening on port ${port}!`))
