var mysql = require('mysql');

var conMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
		user : 'root',
		password : '',
		database : 'myplace_hospedaria'
	});
}

module.exports = function() {
	return conMySQL;
}	